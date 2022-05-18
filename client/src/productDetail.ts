import * as api from "./api/index";
import { cart, item, productType, productVariant } from "./types";
export const loadProductDetail = (productDetailPage: HTMLElement) => {
    const login: HTMLElement = document.getElementById('openLoginBtn')!;
    const logout: HTMLElement = document.getElementById('logout')!;
    productDetailPage.onload = async () => {
        const user = localStorage.getItem('profile');
        user != null ? login.style.display = 'none' : login.style.display = 'block';
        user != null ? logout.style.display = 'block' : logout.style.display = 'none';

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id: number = Number(urlParams.get("idx"));
        const { data } = await api.getProductById({ id: id });
        showProductDetail(id, data);
    }
}

const productDetail = document.getElementById('productDetail');
const showProductDetail = (idx: number, data: productType) => {

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
    const variants: productVariant[] = data.variants;
    selectVariant(data, variants);

    // document.getElementById("variants")!.innerHTML = variants.map(({ color, size, available_units }: productVariant, i: number) =>
    // (
    //     `<div class="column" id="${i}">
    //             <div class="card">
    //             <p>color: ${color}</p>
    //             <p>size: ${size}</p>
    //             <p>units: ${available_units}</p>
    //         <p><button class="addBtn">Add to Cart</button></p>
    //         </div>
    //     </div>`
    // )
    // ).join("");
    // addToCartFunctionality(data, variants);
}

const selectVariant = (data: productType, variants: productVariant[]) => {
    document.getElementById("variants")!.innerHTML = (`
    <label>Select variant</label>
    <select name="variantSelection" id="variantSelection">
        <option default disabled selected value=-1> -- select variant -- </option>
            ${variants.map(({ color, size }: productVariant, i: number) => (`<option value=${i}>color: ${color}, size: ${size}
        </option>`))}
    </select>
    <p><button class="addBtn">Add to Cart</button></p>
    `)

    document.querySelector('.addBtn')?.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const select = document.getElementById('variantSelection') as HTMLSelectElement;
        const variantId = Number(select.options[select.selectedIndex].value);
        if (variantId == -1) {
            alert("Select your size and color first");
            return;
        }
        if (!loggedIn()) {
            return window.location.href = `login.html?item-id=${data.id}&variant-id=${variantId}`;
        }
        addToCart(data, variants[variantId]);
    })

}

// const addToCartFunctionality = (productData: productType, variants: productVariant[]) => {
//     productDetail?.querySelectorAll(".column").forEach((variant: Element, i: number) => {
//         variant.querySelector('.addBtn')?.addEventListener('click', (e: Event) => {
//             e.preventDefault();
//             if (!loggedIn()) {
//                 return window.location.href = `login.html?item-id=${productData.id}&variant-id=${i}`;
//             }
//             addToCart(productData, variants[i]);
//         })
//     })
// }

const loggedIn = () => {
    const profile = JSON.parse(localStorage.getItem('profile')!);
    if (profile) {
        return true;
    }
    return false;
}

export const addToCart = async (product: productType, variant: productVariant) => {
    const profile = JSON.parse(localStorage.getItem('profile')!);
    const user = profile.data.userInfo;
    const cart = await api.getCart(user.user_email);
    const data = {
        user_id: user.user_id,
        product_name: product.title,
        product_size: variant.size,
        product_color: variant.color,
        product_price_per_unit: product.price
    }
    if (productFinished(cart.data, data, variant.available_units)) {
        alert("Products finished.")
        return;
    }
    const ans = await api.addProductToCart(data);
    const param = {
        name: product.title,
        color: variant.color,
        size: variant.size,
        quantity: 1
    }
    await api.updateProduct(param);
    alert(`${product.title} added to cart.`)
}

//Temporary code just for now (probably to be removed)
const productFinished = (cart: cart[], product: item, quantity: number): boolean => {
    let flag: boolean = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].product_name == product.product_name && cart[i].product_color == product.product_color && cart[i].product_size == product.product_size) {
            if (cart[i].quantity == quantity) {
                flag = true;
            }
        }
    }
    return flag;
}