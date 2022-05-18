import { setMessage } from "./messages";

export const validEmail = (email: string) => {
    let valid: boolean = false;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        valid = true;
    } else {
        setMessage("You have entered an invalid email address!");
    }
    return valid;
}

export const emptyField = (fields: any) => {
    let empty = false;
    for (let key in fields) {
        if (fields[key] === "") {
            setMessage("Field is empty");
            empty = true;
            break;
        }
    }
    return empty;
}

export const validPhoneNumber = (phone: string): boolean => {
    let valid: boolean = true;
    if (isNumber(phone) && phone.length != 10) {
        setMessage("Not a valid phone number");
        valid = false;
    }
    return valid;
}

const isNumber = (str: string): boolean => {
    if (typeof str !== 'string') {
        return false;
    }
    if (str.trim() === '') {
        return false;
    }
    return !Number.isNaN(Number(str));
}

export const passwordValidate = (password: string, confirmPassword: string): boolean => {
    let goodPassword = true;
    if (password.length < 8) {
        setMessage("Password is weak must be at least 8 character long.")
    }
    else if (password != confirmPassword) {
        setMessage("Password and confirm Password Doesn't match.")
        goodPassword = false;
    }
    return goodPassword;
}

export const togglePassword = () => {
    document.querySelectorAll('.pass').forEach(toggle => {
        toggle.querySelector('.togglePassword')!.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const visibility = toggle!.querySelector('input');
            const type = visibility!.getAttribute("type") === "password" ? "text" : "password";
            visibility!.setAttribute("type", type);
            toggle.querySelector('#icon')?.classList.toggle("bi-eye");
        })
    })
}