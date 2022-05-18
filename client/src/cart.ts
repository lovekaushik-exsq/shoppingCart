import * as api from "./api/index";
import { getTextOfDropDown, showCountry } from "./auth/register";
import { cart, item, user } from "./types";

export const openCart = () => {
    if (!localStorage.getItem('profile')) {
        return window.location.href = 'login.html';
    }
    window.location.href = "cart.html";
}

const profile = JSON.parse(localStorage.getItem('profile')!);
let user: user;
if (profile) {
    user = profile.data.userInfo;
}
export const loadCart = async (cart: HTMLElement) => {
    const user_email = user.user_email;
    const { data }: { data: cart[] } = await api.getCart(user_email);
    if (data.length == 0) {
        document.getElementById('placeOrder')!.style.display = 'none';
        return;
    }
    showCart(data);
    getAddress(user_email);
}

const showCart = (data: cart[]) => {
    const carts: HTMLElement = document.getElementById("cartProducts")!;
    carts!.innerHTML = data.map(({ product_name, product_color, product_size, quantity, product_price_per_unit }: item) => (`
    <div class="item">
        <div class="buttons">
            <span class="delete-btn"></span>
            <span class="like-btn></span>
        </div>
        <div class="description">
            Name: <span id="name">${product_name}</span>,
            Color: <span id="color">${product_color}</span>,
            Size: <span id="size">${product_size}</span>
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
        <div class="price">Rs.<span id="price">${product_price_per_unit}</span> </div>
        <div class="total-price">Rs.<span id="totalPrice">${(product_price_per_unit * quantity!)}</span></div>
    </div>
    <div>
    </div>
    `)
    ).join("");

    addFunctionalityToCarts(data);

}

const addFunctionalityToCarts = (data: cart[]) => {
    document.querySelectorAll('.item').forEach((item: Element, i: number) => {
        increaseItem(item, i);
        decreaseItem(item as HTMLElement, i);
    })
}

const increaseItem = (item: Element, idx: number) => {
    item.querySelector('#increase')?.addEventListener('click', async () => {
        const profile = JSON.parse(localStorage.getItem('profile')!);
        const user_email = profile.data.userInfo.user_email;
        const { data } = await api.getCart(user_email);
        const product: cart = data[idx];
        let currentQuantity = product.quantity;
        let price = product.product_price_per_unit;
        let totalQuantity = await getQuantity(item);
        if (currentQuantity >= totalQuantity) {
            alert("products Finished");
            return;
        }
        //update the cart
        item.querySelector('#quantity')!.innerHTML = (currentQuantity + 1).toString();
        item.querySelector('#totalPrice')!.innerHTML = (price * (currentQuantity + 1)).toString();
        const user_id = profile.data.userInfo.user_id;
        const product_name = product.product_name;
        const product_color = product.product_color;
        const product_size = product.product_size;
        let quantity = product.quantity + 1;
        await api.updateCart({ user_id, product_name, product_color, product_size, quantity });
        await productUpdate(product_name, product_color, product_size, 1);
        return;
    })
}

const decreaseItem = (item: HTMLElement, idx: number) => {
    item.querySelector('#decrease')?.addEventListener('click', async () => {
        const profile = JSON.parse(localStorage.getItem('profile')!);
        const user_email = profile.data.userInfo.user_email;
        const { data } = await api.getCart(user_email);
        const product: cart = data[idx];
        let currentQuantity = product.quantity;
        let price = product.product_price_per_unit;
        if (currentQuantity == 1) {
            item.style.display = 'none';
        }
        const user_id = profile.data.userInfo.user_id;
        const product_name = product.product_name;
        const product_color = product.product_color;
        const product_size = product.product_size;
        let quantity = product.quantity - 1;
        item.querySelector('#quantity')!.innerHTML = (currentQuantity - 1).toString();
        item.querySelector('#totalPrice')!.innerHTML = (price * (currentQuantity - 1)).toString();
        await api.updateCart({ user_id, product_name, product_color, product_size, quantity });
        await productUpdate(product_name, product_color, product_size, -1);
        return;
    })
}

const productUpdate = async (name: string, color: string, size: string, quantity: number) => {
    const param = {
        name,
        color,
        size,
        quantity
    }
    await api.updateProduct(param);
}

const getQuantity = async (item: Element) => {
    let product_name = item.querySelector('#name')?.innerHTML;
    let color = item.querySelector('#color')?.innerHTML;
    let size = item.querySelector('#size')?.innerHTML;
    const { data } = await api.getQuantityOfProducts({ product_name, color, size });
    return Number(data);
}

const getAddress = async (user_email: string) => {
    const { data } = await api.getAllAddressOfUser(user_email);
    document.getElementById('selectAddress')!.innerHTML = (`
        <label for="address"><b>Address: </b></label>
        <select name="address" id="address">
        <option default disabled selected value> -- select address for delivery -- </option>
            ${data.map(({ address_id, address, city, state, country, zip_code }: { address_id: number, address: string, city: string, state: string, country: string, zip_code: number }, i: number) =>
    (`<option value=${address_id}>
                ${address},
                ${city},
                ${state},
                ${country} - ${zip_code}
                </option>`))}
                <option value='-1'> -- Add address -- </option>
        </select>
    `)
    const select = document.getElementById('address') as HTMLSelectElement;

    select?.addEventListener('change', () => {
        const address_id = Number(select.options[select.selectedIndex].value);
        if (address_id == -1) {
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
    const profile = JSON.parse(localStorage.getItem('profile')!);
    const user = profile.data.userInfo;
    let address_id: number = Number(select.options[select.selectedIndex].value);

    if (address_id == -1) {
        address_id = await getNewAddressId();
    }
    if (address_id == 0) {
        alert("Please give valid address.");
        return;
    }
    const { data }: { data: cart[] } = await api.getCart(user.user_email);
    const total_amount = calculateTotal(data);
    const p = await api.placeOrder({ user_id: user.user_id, address_id, total_amount });
    alert(p.data);
    openCart();
}

const calculateTotal = (products: cart[]) => {
    let total = 0;
    products.forEach((product) => {
        total += product.product_price_per_unit * product.quantity;
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
    const zip_code = (<HTMLInputElement>document.getElementById("zipCode"))!.value;
    const country = getTextOfDropDown('country')!;
    const state = getTextOfDropDown('state')!;
    const city = getTextOfDropDown('city')!;
    const user_email: string = user.user_email;
    const data = {
        user_email,
        address,
        zip_code,
        country,
        state,
        city
    }
    if (!checkAddressValidation(data)) {
        return 0;
    }
    const id = (await api.addNewAddress(data)).data;
    return Number(id);
}