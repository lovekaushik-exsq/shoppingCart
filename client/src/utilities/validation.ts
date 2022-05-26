import * as api from "../api/index";
import { ValidationMessages } from "../constants/constants";
import { UserInfoModel } from "../models/types";

const obj = new ValidationMessages;
export const inValidEmail = (email: string, error: string[]) => {
    let valid: boolean = true;
    if (obj.regexToTestEmail.test(email)) {
        valid = false;
    } else {
        error.push(obj.invalidEmail);
    }
    return valid;
}

export const emptyField = (fields: any, error: string[]) => {
    let empty = false;
    for (let key in fields) {
        if (fields[key] === "") {
            error.push(obj.emptyField);
            empty = true;
            break;
        }
    }
    return empty;
}

export const validPhoneNumber = (phone: string, error: string[]): boolean => {
    let valid: boolean = true;
    if (Number.isNaN(Number(phone)) || phone.trim().length != 10) {
        error.push(obj.invalidPhone);
        valid = false;
    }
    return valid;
}

export const passwordValidate = (password: string, confirmPassword: string, error: string[]): boolean => {
    let goodPassword = true;
    if (password.length < 8) {
        error.push(obj.weakPassword)
        goodPassword = false;
    }
    else if (password != confirmPassword) {
        error.push(obj.passwordNotMatchToConfirmPassword);
        goodPassword = false;
    }
    return !goodPassword;
}

export const oldPasswordIsCorrect = async (user: any, error: string[]) => {
    const existingUser = new UserInfoModel((await api.getUserByEmail(user.userEmail)).data);
    const oldPassword = existingUser.userPassword;
    if (user.oldPassword != oldPassword) {
        error.push(obj.incorrectPassword);
    }
    return oldPassword;
}

export const notSameToOldPassword = (password: string, newPassword: string, error: string[]) => {
    if (password == newPassword) {
        error.push(obj.sameToOldPass);
    }
}