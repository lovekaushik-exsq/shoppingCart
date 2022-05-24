import * as api from "../api/index";
import { addToCart } from "../components/product/productDetail";
import { getUrlParam } from "../utilities/generalFunction";
import { CityModel, CountryModel, ProfileModel, StateModel, IUserRegistration } from "../models/types";
import { makeArray } from "../utilities/generalFunction";
import { error } from "../utilities/globalVariables";
import { emptyField, passwordValidate, togglePassword, inValidEmail, validPhoneNumber } from "../utilities/validation";

export const loadRegister = () => {
    togglePassword();
    const user = localStorage.getItem('profile');
    if (user) {
        window.location.href = 'index.html';
    }
    showCountry();
}
export const validateRegister = (e: Event) => {
    const userName = (<HTMLInputElement>document.getElementById("user_name")).value;
    const userEmail = (<HTMLInputElement>document.getElementById("email")).value;
    const userPassword = (<HTMLInputElement>document.getElementById("password")).value;
    const confirmPassword = (<HTMLInputElement>document.getElementById("confirmPassword")).value;
    const userPhoneNumber = (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    const address = (<HTMLInputElement>document.getElementById("address")).value;
    const zipCode = (<HTMLInputElement>document.getElementById("zipCode")).value;
    const country = getTextOfDropDown('country');
    const state = getTextOfDropDown('state');
    const city = getTextOfDropDown('city');
    const user: IUserRegistration = {
        userName,
        userEmail,
        userPassword,
        userPhoneNumber,
        address,
        zipCode,
        country,
        state,
        city
    };
    const fields = {
        userName,
        userEmail,
        userPassword,
        confirmPassword,
        userPhoneNumber
    }
    e.preventDefault();
    error.length = 0;
    if (emptyField(fields, error) || validationFail(fields, error)) {
        document.getElementById('msg')!.innerHTML = error.join(`\n`);
        return;
    }
    submitRegister(user);
}

const submitRegister = async (user: IUserRegistration) => {
    let data = (await api.register(user)).data;
    if (typeof data == 'string') {
        error.push(data);
        document.getElementById('msg')!.innerHTML = error.join(",");
        return;
    }
    data = new ProfileModel(data);
    localStorage.setItem('profile', JSON.stringify(data));
    if (getUrlParam('item-id')) {
        const itemId = Number(getUrlParam('item-id'));
        const variantId = Number(getUrlParam('variant-id'));
        const result = await api.getProductById(itemId);
        addToCart(result.data, result.data.variants[variantId]);
    }
    return window.history.go(-1);
}

export const showCountry = async () => {

    const countryArea = document.getElementById('countryArea')!;
    const { data } = await api.getAllCountries();
    let countries: CountryModel[] = makeArray(data, CountryModel);
    countryArea.innerHTML = (`
        <label for="country"><b>Country: </b></label>
        <select name="country" id="country">
        <option default disabled selected value> -- select your country -- </option>
            ${countries.map(({ countryId, countryName }: CountryModel) => (`<option value=${countryId}>${countryName}</option>`))}
        </select>
    `)
    const select = document.getElementById('country') as HTMLSelectElement;
    select?.addEventListener('change', () => {
        const country = Number(select.options[select.selectedIndex].value);
        showState(country);
    })
}

const showState = async (countryId: number) => {
    const stateArea = document.getElementById('stateArea')!;
    const { data } = await api.getStatesFor(countryId);
    const states = makeArray(data, StateModel);
    stateArea.innerHTML = (`
        <label for="state"><b>Choose a country: </b></label>
        <select name="state" id="state">
        <option default disabled selected value> -- select your state -- </option>
            ${states.map(({ stateId, stateName }: StateModel) => (`<option value=${stateId}>${stateName}</option>`))}
        </select>
    `);
    const select = document.getElementById('state') as HTMLSelectElement;
    select?.addEventListener('change', () => {
        const state = Number(select.options[select.selectedIndex].value);
        showCity(state);
    })

}

const showCity = async (stateId: number) => {
    const cityArea = document.getElementById('cityArea')!;
    const { data } = await api.getCitiesFor(stateId);
    const cities = makeArray(data, CityModel);
    cityArea.innerHTML = (`
        <label for="city"><b>Choose a city: </b></label>
        <select name="city" id="city">
        <option default disabled selected value> -- select your city -- </option>
            ${cities.map(({ cityId, cityName }: CityModel) => (`<option value="${cityId}">${cityName}</option>`))}
        </select>
    `)
}



export const getTextOfDropDown = (id: string) => {
    const select = document.getElementById(id) as HTMLSelectElement;
    const value = select.options[select.selectedIndex].value;
    if (!value) {
        return null;
    }
    const text = select.options[select.selectedIndex].text;
    return text;
}

const validationFail = (user: IUserRegistration, error: string[]) => {
    let err: boolean = false;
    inValidEmail(user.userEmail, error)
    passwordValidate(user.userPassword, user.confirmPassword!, error)
    validPhoneNumber(user.userPhoneNumber, error);
    if (error.length > 0) {
        err = true;
    }

    return err;
}