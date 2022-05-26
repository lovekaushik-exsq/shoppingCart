import * as userQueries from "../repository/userQueries";
import * as messages from "../constants/messages"
import dotenv from "dotenv";
import { UserInfoModel, Result, LoginDetailModel, UserModel } from "../models/types";
import jwt from "jsonwebtoken";
dotenv.config();

export const loginService = async (inputUserDetail: LoginDetailModel) => {
    const user_info: UserModel = await userQueries.getUserByEmail(inputUserDetail.user_email);
    if (!user_info || user_info.user_password != inputUserDetail.user_password) {
        return messages.failedAuth;
    }
    const user_token = { email: user_info.user_email, id: user_info.user_id };
    const token: string = jwt.sign(user_token, process.env.secret!, { expiresIn: process.env.tokenExpiration });
    if (!token) {
        return messages.tokenFail;
    }
    return { user_info, token };
}

export const registerService = async (inputUserDetail: UserInfoModel) => {
    const existingUser: UserModel = await (userQueries.getUserByEmail(inputUserDetail.user_email));
    if (existingUser) {
        return messages.duplicateUser;
    }
    await userQueries.addUser(inputUserDetail);
    if (addressIsGiven(inputUserDetail)) {
        addAddressForUser(inputUserDetail);
    }
    const user_info: UserModel = await (userQueries.getUserByEmail(inputUserDetail.user_email));
    const user_token = { email: user_info.user_email, id: user_info.user_id };
    const token: string = jwt.sign(user_token, process.env.secret!, { expiresIn: process.env.tokenExpiration });
    if (!token) {
        return messages.tokenFail;
    }
    return { user_info, token };
}

export const getUserByEmailService = async (user_email: string) => {
    let user: UserModel | string = await userQueries.getUserByEmail(user_email);
    return user;
}

export const updateUserByEmailService = async (user: UserModel) => {
    if (user.user_email === null || user.user_id === null) {
        return messages.notAuthenticated;
    }
    await userQueries.updateUserByEmail(user);
    return await getUserByEmailService(user.user_email!);
}

const addAddressForUser = async (inputUserDetail: UserInfoModel) => {
    let addressId = ((await userQueries.getAddressId(inputUserDetail))).address_id;
    if (!addressId) {
        addressId = (await userQueries.addNewAddress(inputUserDetail)).address_id;
    }
    const userId: number | undefined = (await userQueries.getUserByEmail(inputUserDetail.user_email)).user_id;
    if (userId) {
        await userQueries.mapAddress(userId, addressId as number);
    }
}

const addressIsGiven = (fields: UserInfoModel) => {
    let address = true;
    for (let key in fields) {
        if (fields[key as keyof UserInfoModel] === "") {
            address = false;
            break;
        }
    }
    return address;
}