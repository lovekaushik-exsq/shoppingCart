import * as api from "../api/index";
import { addToCart } from "../components/product/productDetail";
import { inValidEmail, emptyField, togglePassword } from "../utilities/validation";
import { error } from "../utilities/globalVariables";
import { ProfileModel } from "../models/types";
import { getUrlParam } from "../utilities/generalFunction";

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
    error.length = 0;
    if (emptyField(params, error) || inValidEmail(userEmail, error)) {
        document.getElementById('msg')!.innerHTML = error.join(",");
        return;
    }
    await submitLogin(params);
}

const submitLogin = async (params: { userEmail: string, userPassword: string }) => {
    let data = (await api.login(params)).data;
    if (typeof data == 'string') {
        document.getElementById('msg')!.innerHTML = data;
        return;
    }
    data = new ProfileModel(data);

    //Add modals
    localStorage.setItem('profile', JSON.stringify(data));
    if (getUrlParam('item-id')) {
        const itemId = Number(getUrlParam('item-id'));
        const variantId = Number(getUrlParam('variant-id'));
        const result = await api.getProductById(itemId);
        addToCart(result.data, result.data.variants[variantId]);
    }
    return window.history.go(-1);
}
