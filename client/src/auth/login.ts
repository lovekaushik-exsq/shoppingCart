import * as api from "../api/index";
import { addToCart } from "../productDetail";
import { validEmail, emptyField, togglePassword } from "../utilities/validation";
import { getMessage } from "../utilities/messages";

export const loadLogin = () => {
    const user = localStorage.getItem('profile');
    togglePassword();
    if (user) {
        window.location.href = 'index.html';
    }
}
export const validateLogin = async (e: Event) => {
    e.preventDefault();
    const user_email = (<HTMLInputElement>document.getElementById("email")).value;
    const user_password = (<HTMLInputElement>document.getElementById("password")).value;
    const params = {
        user_email,
        user_password,
    };
    if (emptyField(params) || !validEmail(user_email)) {
        document.getElementById('msg')!.innerHTML = getMessage();
        return;
    }
    await submitLogin(params);
}

const submitLogin = async (params: { user_email: string, user_password: string }) => {
    const data = await api.login(params);
    if (typeof data.data == 'string') {
        document.getElementById('msg')!.innerHTML = data.data;
        return;
    }
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
