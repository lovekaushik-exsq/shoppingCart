import { cartModel, item, makeArray, profileModel, userType } from "../../models/types";
import * as api from "../../api/index";
import { showProducts } from "../product/products";

const profile: profileModel = JSON.parse(localStorage.getItem('profile')!);
let user: userType;
if (profile) {
    user = profile.userInfo;
}

export const openOrders = () => {
    window.location.href = 'order.html';
}

export const loadOrders = async () => {
    const data: cartModel[] = makeArray((await api.getOrders(user.userEmail)).data, cartModel);
    console.log(data);
    showOrders(data);
}

const showOrders = (data: cartModel[]) => {
    const carts: HTMLElement = document.getElementById("orderedProducts")!;
    let prev = data[0].orderDate;
    let i = 1;
    carts!.innerHTML = data.map(({ productName, productColor, productSize, quantity, productPricePerUnit, orderDate }: item) => (`
    Order ${prev == orderDate ? i : i = (i + 1)}
    <div class="item">
        <div class="buttons">
            <span class="delete-btn"></span>
            <span class="like-btn></span>
        </div>
        <div class="description">
            <u>Name:</u> <span id="name">${productName}</span>,
            <u>Color:</u> <span id="color">${productColor}</span>,
            <u>Size:</u> <span id="size">${productSize}</span>,
            <u>Quantity:</u> <span id="quantity">${quantity}</span>,
            <u>Price of one Item:</u> Rs.<span id="price">${productPricePerUnit}</span><br/>
            <u>Order Date</u> ${prev == orderDate ? prev = prev : prev = orderDate}
        </div>
    </div>
    <div>
    </div>
    `)
    ).join("");

}