export const inValidEmail = (email: string, error: string[]) => {
    let valid: boolean = true;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        valid = false;
    } else {
        error.push("You have entered an invalid email address!");
    }
    return valid;
}

export const emptyField = (fields: any, error: string[]) => {
    let empty = false;
    for (let key in fields) {
        if (fields[key] === "") {
            error.push("Field is empty");
            empty = true;
            break;
        }
    }
    return empty;
}

export const validPhoneNumber = (phone: string, error: string[]): boolean => {
    let valid: boolean = true;
    if (Number.isNaN(Number(phone)) || phone.trim().length != 10) {
        error.push("Not a valid phone number");
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
        error.push("Password is weak must be at least 8 character long.")
        goodPassword = false;
    }
    else if (password != confirmPassword) {
        error.push("Password and confirm Password Doesn't match.")
        goodPassword = false;
    }
    return !goodPassword;
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