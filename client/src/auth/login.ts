import * as api from "../api/index";
import { addToCart } from "../components/product/productDetail";
import { validEmail, emptyField, togglePassword } from "../utilities/validation";
import { getMessage } from "../utilities/messages";
import { profileModel } from "../models/types";

export const loadLogin = () => {
    const user = localStorage.getItem('profile');
    togglePassword();
    if (user) {
        window.location.href = 'index.html';
    }
}
export const validateLogin = async (e: Event) => {
    e.preventDefault();
    const userEmail = (<HTMLInputElement>document.getElementById("email")).value;
    const userPassword = (<HTMLInputElement>document.getElementById("password")).value;
    const params = {
        userEmail,
        userPassword,
    };

    if (emptyField(params) || !validEmail(userEmail)) {
        document.getElementById('msg')!.innerHTML = getMessage();
        return;
    }
    await submitLogin(params);
}

const submitLogin = async (params: { userEmail: string, userPassword: string }) => {
    const data = new profileModel((await api.login(params)).data);
    if (typeof data == 'string') {
        document.getElementById('msg')!.innerHTML = data;
        return;
    }

    //Add modals
    localStorage.setItem('profile', JSON.stringify(data));
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('item-id')) {
        const itemId = Number(urlParams.get('item-id'));
        const variantId = Number(urlParams.get('variant-id'));
        const result = await api.getProductById({ id: itemId });
        addToCart(result.data, result.data.variants[variantId]);
    }
    return window.history.go(-1);
}
