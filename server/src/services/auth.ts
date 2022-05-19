import * as userQueries from "../repository/userQueries";
import { userInfoModel, result, loginDetailModel, userModel } from "../models/types";
const jwt = require("jsonwebtoken");

export const loginService = async (inputUserDetail: loginDetailModel): Promise<result> => {
    const user_info: userModel = await userQueries.getUserByEmail(inputUserDetail.user_email);
    if (!user_info || user_info.user_password != inputUserDetail.user_password) {
        return "Invalid Credentials"
    }
    const user_token = { email: user_info.user_email };
    const token: string = jwt.sign(user_token, "secret", { expiresIn: "1h" });
    if (!token) {
        return "Token Didn't get created";
    }
    return { user_info, token };
}

export const registerService = async (inputUserDetail: userInfoModel): Promise<result> => {
    const existingUser: userModel = await (userQueries.getUserByEmail(inputUserDetail.user_email));
    if (existingUser) {
        return "User already exist.";
    }
    await userQueries.addUser(inputUserDetail);
    if (addressIsGiven(inputUserDetail)) {
        addAddressForUser(inputUserDetail);
    }
    const user_info: userModel = await (userQueries.getUserByEmail(inputUserDetail.user_email));
    const user_token = { email: user_info.user_email };
    const token: string = jwt.sign(user_token, "secret", { expiresIn: "1h" });
    if (!token) {
        return "Token Didn't get created";
    }
    return { user_info, token };
}

const addAddressForUser = async (inputUserDetail: userInfoModel) => {
    let addressId = ((await userQueries.getAddressId(inputUserDetail))).address_id;
    if (!addressId) {
        addressId = (await userQueries.addNewAddress(inputUserDetail)).address_id;
    }
    const userId: number | undefined = (await userQueries.getUserByEmail(inputUserDetail.user_email)).user_id;
    if (userId) {
        await userQueries.mapAddress(userId, addressId as number);
    }
}

const addressIsGiven = (fields: userInfoModel) => {
    let address = true;
    for (let key in fields) {
        if (fields[key as keyof userInfoModel] === "") {
            address = false;
            break;
        }
    }
    return address;
}