import * as constant from "../constants/constants";
export const inValidEmail = (email: string, error: string[]) => {
    let valid: boolean = true;
    if (constant.regexToTestEmail.test(email)) {
        valid = false;
    } else {
        error.push(constant.invalidEmail);
    }
    return valid;
}

export const emptyField = (fields: any, error: string[]) => {
    let empty = false;
    for (let key in fields) {
        if (fields[key] === "") {
            error.push(constant.emptyField);
            empty = true;
            break;
        }
    }
    return empty;
}

export const validPhoneNumber = (phone: string, error: string[]): boolean => {
    let valid: boolean = true;
    if (Number.isNaN(Number(phone)) || phone.trim().length != 10) {
        error.push(constant.invalidPhone);
        valid = false;
    }
    return valid;
}

const isNumber = (str: string): boolean => {
    return !Number.isNaN(Number(str));
}

export const passwordValidate = (password: string, confirmPassword: string, error: string[]): boolean => {
    let goodPassword = true;
    if (password.length < 8) {
        error.push(constant.weakPassword)
        goodPassword = false;
    }
    else if (password != confirmPassword) {
        error.push(constant.passwordNotMatchToConfirmPassword);
        goodPassword = false;
    }
    return !goodPassword;
}

export const togglePassword = () => {
    document.querySelectorAll('.pass').forEach((toggle: Element) => {
        toggle.querySelector('.togglePassword')!.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const visibility = toggle!.querySelector('input');
            const type = visibility!.getAttribute("type") === "password" ? "text" : "password";
            visibility!.setAttribute("type", type);
            toggle.querySelector('#icon')?.classList.toggle("bi-eye");
        })
    })
}