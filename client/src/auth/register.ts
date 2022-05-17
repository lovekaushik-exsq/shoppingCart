import * as api from "../api/index";
import { userRegistration } from "../types";
import { getMessage, setMessage } from "../utilities/messages";
import { emptyField, passwordValidate, validEmail, validPhoneNumber } from "../utilities/validation";

export const loadRegister = () => {
    document.querySelectorAll('.pass').forEach(toggle => {
        toggle.querySelector('.togglePassword')!.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const visibility = toggle!.querySelector('input');
            const type = visibility!.getAttribute("type") === "password" ? "text" : "password";
            visibility!.setAttribute("type", type);
            toggle.querySelector('#icon')?.classList.toggle("bi-eye");
        })
    })
    const user = localStorage.getItem('profile');
    if (user) {
        window.location.href = 'index.html';
    }
    showCountry();
}
export const validateRegister = (e: Event) => {
    const user_name = (<HTMLInputElement>document.getElementById("user_name")).value;
    const user_email = (<HTMLInputElement>document.getElementById("email")).value;
    const user_password = (<HTMLInputElement>document.getElementById("password")).value;
    const confirmPassword = (<HTMLInputElement>document.getElementById("confirmPassword")).value;
    const user_phone_number = (<HTMLInputElement>document.getElementById("phoneNumber")).value;
    const address = (<HTMLInputElement>document.getElementById("address")).value;
    const zip_code = (<HTMLInputElement>document.getElementById("zipCode")).value;
    const country = getTextOfDropDown('country');
    const state = getTextOfDropDown('state');
    const city = getTextOfDropDown('city');
    const user = {
        user_name,
        user_email,
        user_password,
        confirmPassword,
        user_phone_number,
        address,
        zip_code,
        country,
        state,
        city
    } as userRegistration;
    e.preventDefault();
    if (emptyField(user) || checkValidation(user)) {
        document.getElementById('msg')!.innerHTML = getMessage();
        return;
    }
    submitRegister(user);
}

const submitRegister = async (user: userRegistration) => {
    const data = await api.register(user);
    if (typeof data.data == 'string') {
        setMessage(data.data);
        return;
    }
    localStorage.setItem('profile', JSON.stringify(data));
    return window.history.go(-1);
}

export const showCountry = async () => {

    const countryArea = document.getElementById('countryArea')!;
    const { data } = await api.getAllCountries();
    countryArea.innerHTML = (`
        <label for="country"><b>Country: </b></label>
        <select name="country" id="country">
        <option default disabled selected value> -- select your country -- </option>
            ${data.map(({ country_id, country_name }: { country_id: number, country_name: string }, i: number) => (`<option value=${country_id}>${country_name}</option>`))}
        </select>
    `)
    const select = document.getElementById('country') as HTMLSelectElement;
    select?.addEventListener('change', () => {
        const country = Number(select.options[select.selectedIndex].value);
        showState(country);
    })
}

const showState = async (country_id: number) => {
    const stateArea = document.getElementById('stateArea')!;
    const { data } = await api.getStatesFor({ country_id });
    stateArea.innerHTML = (`
        <label for="state"><b>Choose a country: </b></label>
        <select name="state" id="state">
        <option default disabled selected value> -- select your state -- </option>
            ${data.map(({ state_id, state_name }: { state_id: number, state_name: string }, i: number) => (`<option value=${state_id}>${state_name}</option>`))}
        </select>
    `);
    const select = document.getElementById('state') as HTMLSelectElement;
    select?.addEventListener('change', () => {
        const state = Number(select.options[select.selectedIndex].value);
        showCity(state);
    })

}

const showCity = async (state_id: number) => {
    const cityArea = document.getElementById('cityArea')!;
    const { data } = await api.getCitiesFor({ state_id });
    cityArea.innerHTML = (`
        <label for="city"><b>Choose a city: </b></label>
        <select name="city" id="city">
        <option default disabled selected value> -- select your city -- </option>
            ${data.map(({ city_id, city_name }: { city_id: number, city_name: string }, i: number) => (`<option value="${city_id}">${city_name}</option>`))}
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

const checkValidation = (user: userRegistration) => {
    let error = false;
    if (!validEmail(user.user_email) || !passwordValidate(user.user_password, user.confirmPassword!) || !validPhoneNumber(user.user_phone_number)) {
        error = true;
    }
    return error;
}