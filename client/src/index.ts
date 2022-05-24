import { loadRegister, validateRegister } from "./auth/register";
import { loadHomePage } from "./components/home/home";
import { loadLogin, validateLogin } from "./auth/login";
import { loadProductDetail } from "./components/product/productDetail";
import { search } from "./components/home/searchProduct";
import { openFilter } from "./components/home/filter";
import { loadCart, openCart, placeOrder } from "./components/cart/cart";
import { editProfile, loadEditProfile, profile } from "./components/home/profile";
import { loadOrders, openOrders } from "./components/cart/order";

//Disable Enter key
window.addEventListener('keypress', (e: KeyboardEvent) => {
    if (e.keyCode == 13) {
        e.preventDefault();
    }
})

// Load Home page
const homePage = document.getElementById('homePage');
if (homePage != null) {
    loadHomePage(homePage);
}

// LOGIN
const submitLogin = document.getElementById('submitLogin');
const loginPage = document.getElementById('loginPage');
if (loginPage) {
    loadLogin();
}
submitLogin?.addEventListener('click', validateLogin);

// REGISTER
const openRegister = document.querySelector('#openRegisterBtn');
const registerPage = document.getElementById('registerPage');
const submitRegister = document.getElementById('submitRegister');
//open register
openRegister?.addEventListener('click', () => {
    window.location.href = "register.html"
})
//load register
if (registerPage != null) {
    loadRegister();
}
// submit register
submitRegister?.addEventListener('click', validateRegister);

// OPEN PRODUCT DETAIL PAGE
const productDetailPage = document.getElementById('productDetailPage');
if (productDetailPage != null) {
    loadProductDetail(productDetailPage);
}

//Profile
if (localStorage.getItem('profile') && document.getElementById('profile')) {
    const user = localStorage.getItem('profile')!;
    const nameChar = JSON.parse(user).userInfo.userName.charAt(0);
    document.getElementById('profile')!.innerHTML = nameChar.toUpperCase();
}
document.getElementById('profile')?.addEventListener('click', (e: Event) => {
    e.preventDefault();
    profile();
})
if (document.getElementById('profileUpdatePage')) {
    loadEditProfile();
}
document.getElementById('submitUpdate')?.addEventListener('click', async (e: Event) => {
    e.preventDefault();
    await editProfile();
})

//Search
document.getElementById('searchBtn')?.addEventListener('click', (e: Event) => {
    e.preventDefault();
    search();
});
document.getElementById('clearSearch')?.addEventListener('click', () => {
    localStorage.removeItem('search');
    (<HTMLInputElement>document.getElementById('searchBar'))!.value = "";
    const prev = window.location.href;
    window.location.href = prev;
})
document.getElementById('openFilter')?.addEventListener('click', openFilter)
document.getElementById('clearFilter')?.addEventListener('click', () => {
    localStorage.removeItem('filterColors');
    localStorage.removeItem('filterSize');
    const prev = window.location.href;
    window.location.href = prev;
})
document.getElementById('openCart')?.addEventListener('click', openCart);
const cart = document.getElementById("cart");
if (cart != null) {
    loadCart(cart);
}

document.getElementById("placeOrder")?.addEventListener('click', placeOrder);

document.getElementById("getOrders")?.addEventListener('click', openOrders);
const orders = document.getElementById('orders');
if (orders != null) {
    loadOrders();
}