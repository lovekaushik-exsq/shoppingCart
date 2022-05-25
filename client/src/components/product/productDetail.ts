import * as api from "../../api/index";
import { getUrlParam, unAuthorized } from "../../utilities/generalFunction";
import * as messages from "../../constants/constants"
import { CartModel, IItem, ProductTypeModel, ProductVariantModel } from "../../models/types";
import { makeArray } from "../../utilities/generalFunction";
export const loadProductDetail = (productDetailPage: HTMLElement) => {
    const login: HTMLElement = document.getElementById('openLoginBtn')!;
    const profile: HTMLElement = document.getElementById('profile')!;
    productDetailPage.onload = async () => {
        const user = localStorage.getItem('profile');
        user != null ? login.style.display = 'none' : login.style.display = 'block';
        user != null ? profile.style.display = 'block' : profile.style.display = 'none';

        const id: number = Number(getUrlParam("idx"));
        const data: ProductTypeModel = new ProductTypeModel((await api.getProductById(id)).data);
        showProductDetail(id, data);
    }
}

const productDetail = document.getElementById('productDetail');
const showProductDetail = (idx: number, data: ProductTypeModel) => {

    productDetail!.innerHTML = (`<main>
         <div class="container">
             <div class="cover" style="background-image: url(${data.image});"></div>
             <div class="content">
                 <div class="nav">
                     <span class="logo">${data.category}</span>
                     <span><i class='fab fa-sistrix' style='font-size:24px'></i></span>
                 </div>
                 <div class="content-body">
                     <div class="black-label">
                         <span class="title"><b>${data.title}</b></span>
                         <p>${data.description}</p>
                                 <div class="prix">
                                    <span><b>${data.price}</b></span>
                                </div>
                                </div>                    
                 </div>
                 
             </div>
         </div>
         </main>
         <div class="row" id="variants"></div>
     `)
    const variants: ProductVariantModel[] = data.variants;
    selectVariant(data, variants);
}

const selectVariant = (data: ProductTypeModel, variants: ProductVariantModel[]) => {
    document.getElementById("variants")!.innerHTML = (`
    <label>Select variant</label>
    <select name="variantSelection" id="variantSelection">
        <option default disabled selected value=-1> -- select variant -- </option>
            ${variants.map(({ color, size }: ProductVariantModel, i: number) => (`<option value=${i}>color: ${color}, size: ${size}
        </option>`))}
    </select>
    <p><button class="addBtn">Add to Cart</button></p>
    `)

    document.querySelector('.addBtn')?.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const select = document.getElementById('variantSelection') as HTMLSelectElement;
        const variantId = Number(select.options[select.selectedIndex].value);
        if (variantId == -1) {
            alert(messages.chooseFirst);
            return;
        }
        if (!loggedIn()) {
            return window.location.href = `login.html?item-id=${data.id}&variant-id=${variantId}`;
        }
        addToCart(data, variants[variantId]);
    })

}

const loggedIn = () => {
    const profile = JSON.parse(localStorage.getItem('profile')!);
    if (profile) {
        return true;
    }
    return false;
}

export const addToCart = async (product: ProductTypeModel, variant: ProductVariantModel) => {
    const profile = JSON.parse(localStorage.getItem('profile')!);
    const user = profile.userInfo;
    const cartValue = (await api.getCart(user.userEmail)).data;
    if (typeof cartValue === 'string') {
        return unAuthorized(cartValue);
    }
    const cart: CartModel[] = makeArray(cartValue, CartModel);
    const data = {
        userId: user.userId,
        productName: product.title,
        productSize: variant.size,
        productColor: variant.color,
        productPricePerUnit: product.price
    }
    if (productFinished(cart, data, variant.availableUnits)) {
        alert(messages.productFinished)
        return;
    }
    const productAdded = (await api.addProductToCart(data)).data;
    const param = {
        name: product.title,
        color: variant.color,
        size: variant.size,
        quantity: 1
    }
    const productUpdated = (await api.updateProduct(param)).data;
    alert(`${product.title} added to cart.`)
}

//Temporary code just for now (probably to be removed)
const productFinished = (cart: CartModel[], product: IItem, quantity: number): boolean => {
    let flag: boolean = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].productName == product.productName && cart[i].productColor == product.productColor && cart[i].productSize == product.productSize) {
            if (cart[i].quantity == quantity) {
                flag = true;
            }
        }
    }
    return flag;
}