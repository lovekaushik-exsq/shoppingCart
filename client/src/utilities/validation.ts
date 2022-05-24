import * as constant from "../constants/constants";
import * as api from "../api/index";
import * as messages from "../constants/constants";
import { UserInfoModel } from "../models/types";
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

export const oldPasswordIsCorrect = async (user: any, error: string[]) => {
    const existingUser = new UserInfoModel((await api.getUserByEmail(user.userEmail)).data);
    const oldPassword = existingUser.userPassword;
    if (user.oldPassword != oldPassword) {
        error.push(messages.incorrectPassword);
    }
    return oldPassword;
}

export const notSameToOldPassword = (password: string, newPassword: string, error: string[]) => {
    if (password == newPassword) {
        error.push(messages.sameToOldPass);
    }
}