import { loadRegister, validateRegister } from "./auth/register";
import { loadHomePage } from "./home";
import { loadLogin, validateLogin } from "./auth/login";
import { loadProductDetail } from "./productDetail";
import { search } from "./searchProduct";
import { openFilter } from "./filter";
import { loadCart, openCart, placeOrder } from "./cart";

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

//LOGOUT
document.getElementById('logout')?.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html'
})

document.getElementById('searchBtn')?.addEventListener('click', (e: Event) => {
    e.preventDefault();
    search();
});
document.getElementById('clearSearch')?.addEventListener('click', () => {
    localStorage.removeItem('search');
    (<HTMLInputElement>document.getElementById('searchBar'))!.value = "";
    window.location.href = 'index.html';
})
document.getElementById('openFilter')?.addEventListener('click', openFilter)
document.getElementById('clearFilter')?.addEventListener('click', () => {
    localStorage.removeItem('filterColors');
    localStorage.removeItem('filterSize');
    window.location.href = 'index.html'
})
document.getElementById('openCart')?.addEventListener('click', openCart);
const cart = document.getElementById("cart");
if (cart != null) {
    loadCart(cart);
}

document.getElementById("placeOrder")?.addEventListener('click', placeOrder);