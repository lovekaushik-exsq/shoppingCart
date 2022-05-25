import * as api from "../../api/index";
import { getTextOfDropDown, showCountry } from "../../auth/register";
import { AddressModel, CartModel, IItem, ProfileModel, IUserType } from "../../models/types";
import { makeArray, unAuthorized } from "../../utilities/generalFunction";


const profile: ProfileModel = JSON.parse(localStorage.getItem('profile')!);
let user: IUserType;
if (profile) {
    user = profile.userInfo;
}
export const openCart = () => {
    if (!localStorage.getItem('profile')) {
        return window.location.href = 'login.html';
    }
    window.location.href = "cart.html";
}

export const loadCart = async (cart: HTMLElement) => {
    const cartValue = (await api.getCart(user.userEmail)).data;
    if (typeof cartValue === 'string') {
        return unAuthorized(cartValue);
    }
    const data: CartModel[] = makeArray(cartValue, CartModel);
    if (data.length == 0) {
        document.getElementById('placeOrder')!.style.display = 'none';
        return;
    }
    showCart(data);
    getAddress(user.userEmail);
}

const showCart = (data: CartModel[]) => {
    const carts: HTMLElement = document.getElementById("cartProducts")!;
    carts!.innerHTML = data.map(({ productName, productColor, productSize, quantity, productPricePerUnit }: IItem) => (`
    <div class="item">
        <div class="buttons">
            <span class="delete-btn"></span>
            <span class="like-btn></span>
        </div>
        <div class="description">
            Name: <span id="name">${productName}</span>,
            Color: <span id="color">${productColor}</span>,
            Size: <span id="size">${productSize}</span>
        </div>
        <div class="quantity">
            <button class="plus-btn" type="button" name="button" id="increase">
                <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
            <span id="quantity">${quantity}</span>
            <button class="minus-btn" type = "button" name = "button" id="decrease">
                <i class="fa fa-minus" aria-hidden="true"></i>
            </button>
        </div>
        <div class="price">Rs.<span id="price">${productPricePerUnit}</span> </div>
        <div class="total-price">Rs.<span id="totalPrice">${(productPricePerUnit * quantity!)}</span></div>
    </div>
    <div>
    </div>
    `)
    ).join("");

    addFunctionalityToCarts(data);

}

const addFunctionalityToCarts = async (data: CartModel[]) => {
    const products = makeArray((await api.getCart(user.userEmail)).data, CartModel);
    document.querySelectorAll('.item').forEach(async (item: Element, i: number) => {
        const product: CartModel = products[i];
        increaseItem(item, product);
        decreaseItem(item as HTMLElement, product);
    })
}

const increaseItem = (item: Element, product: CartModel) => {
    item.querySelector('#increase')?.addEventListener('click', async () => {
        let currentQuantity = product.quantity;
        let price = product.productPricePerUnit;
        let totalQuantity = await getQuantity(item);
        if (currentQuantity >= totalQuantity) {
            alert("products Finished");
            return;
        }
        //update the cart
        item.querySelector('#quantity')!.innerHTML = (currentQuantity + 1).toString();
        item.querySelector('#totalPrice')!.innerHTML = (price * (currentQuantity + 1)).toString();
        const userId = profile.userInfo.userId!;
        const productName = product.productName;
        const productColor = product.productColor;
        const productSize = product.productSize;
        let quantity = product.quantity + 1;
        await api.updateCart({ userId, productName, productColor, productSize, quantity });
        // await productUpdate(productName, productColor, productSize, 1);
        return;
    })
}

const decreaseItem = (item: HTMLElement, product: CartModel) => {
    item.querySelector('#decrease')?.addEventListener('click', async () => {
        let currentQuantity = product.quantity;
        let price = product.productPricePerUnit;
        if (currentQuantity == 1) {
            item.style.display = 'none';
        }
        const userId = profile.userInfo.userId!;
        const productName = product.productName;
        const productColor = product.productColor;
        const productSize = product.productSize;
        let quantity = product.quantity - 1;
        item.querySelector('#quantity')!.innerHTML = (currentQuantity - 1).toString();
        item.querySelector('#totalPrice')!.innerHTML = (price * (currentQuantity - 1)).toString();
        await api.updateCart({ userId, productName, productColor, productSize, quantity });
        // await productUpdate(productName, productColor, productSize, -1);
        return;
    })
}

const productUpopdate = async (name: string, color: string, size: string, quantity: number) => {
    const param = {
        name,
        color,
        size,
        quantity
    }
    await api.updateProduct(param);
}

const getQuantity = async (item: Element) => {
    let productName = item.querySelector('#name')?.innerHTML;
    let color = item.querySelector('#color')?.innerHTML;
    let size = item.querySelector('#size')?.innerHTML;
    const { data } = await api.getQuantityOfProducts({ productName, color, size });
    return Number(data);
}

const getAddress = async (userEmail: string) => {
    console.log((await api.getAllAddressOfUser(userEmail)).data)
    const data = makeArray((await api.getAllAddressOfUser(userEmail)).data, AddressModel);
    document.getElementById('selectAddress')!.innerHTML = (`
        <label for="address"><b>Address: </b></label>
        <select name="address" id="address">
        <option default disabled selected value> -- select address for delivery -- </option>
            ${data.map(({ addressId, address, city, state, country, zipCode }: AddressModel, i: number) =>
    (`<option value=${addressId}>
                ${address},
                ${city},
                ${state},
                ${country} - ${zipCode}
                </option>`))}
                <option value='-1'> -- Add address -- </option>
        </select>
    `)
    const select = document.getElementById('address') as HTMLSelectElement;

    select?.addEventListener('change', () => {
        const addressId = Number(select.options[select.selectedIndex].value);
        if (addressId == -1) {
            document.getElementById("newAddress")!.style.display = 'block';
            getNewAddress();
            return;
        }
        else {
            document.getElementById("newAddress")!.style.display = 'none';
        }
    })
}

export const placeOrder = async () => {
    const select = document.getElementById('address') as HTMLSelectElement;
    let addressId: number = Number(select.options[select.selectedIndex].value);

    if (addressId == -1) {
        addressId = await getNewAddressId();
    }
    if (addressId == 0) {
        alert("Please give valid address.");
        return;
    }
    const data: CartModel[] = makeArray((await api.getCart(user.userEmail)).data, CartModel);
    const totalAmount = calculateTotal(data);
    const p = await api.placeOrder({ userId: user.userId!, addressId, totalAmount });
    openCart();
}

const calculateTotal = (products: CartModel[]) => {
    let total = 0;
    products.forEach((product) => {
        total += product.productPricePerUnit * product.quantity;
    })
    return total;
}

const getNewAddress = () => {
    document.getElementById('newAddress')!.innerHTML = (`
    <label for="address"><b>Address</b></label>
        <input
          type="text"
          name="addressText"
          id="addressText"
          placeholder="Address"
          required
        />
        <label for="zipcode"><b>Zip-Code</b></label>
        <input
          type="number"
          name="zipCode"
          id="zipCode"
          placeholder="Zip-Code"
          required
        />
        <div id="countryArea"></div>
        <div id="stateArea">
          <label for="state"><b>State: </b></label>
          <select name="state" id="state" disabled>
            <option default disabled selected value>
              -- select your state --
            </option>
          </select>
        </div>
        <div id="cityArea">
          <label for="city"><b>City: </b></label>
          <select name="city" id="city" disabled>
            <option default disabled selected value>
              -- select your city --
            </option>
          </select>
        </div>`)

    showCountry();
}

const checkAddressValidation = (data: any) => {
    let check: boolean = true;
    for (const field in data) {
        if (!data[field] || data[field] == '') {
            check = false;
            break;
        }
    }
    return check;
}

const getNewAddressId = async () => {
    const address = (<HTMLInputElement>document.getElementById("addressText"))!.value;
    const zipCode = (<HTMLInputElement>document.getElementById("zipCode"))!.value;
    const country = getTextOfDropDown('country')!;
    const state = getTextOfDropDown('state')!;
    const city = getTextOfDropDown('city')!;
    const userEmail: string = user.userEmail;
    const data = {
        userEmail,
        address,
        zipCode,
        country,
        state,
        city
    }
    if (!checkAddressValidation(data)) {
        return 0;
    }
    const id = (await api.addNewAddress(data)).data;
    if (typeof id === 'string') {
        return unAuthorized(id);
    }
    return id;
}