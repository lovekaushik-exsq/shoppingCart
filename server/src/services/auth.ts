import * as userQueries from "../repository/userQueries";
import { loginDetail, user, userInfo, result } from "../types";
const jwt = require("jsonwebtoken");

export const loginService = async (inputUserDetail: loginDetail): Promise<result> => {
    const userInfo: user = await userQueries.getUserByEmail(inputUserDetail.user_email);
    if (!userInfo || userInfo.user_password != inputUserDetail.user_password) {
        return "Invalid Credentials"
    }
    const userToken = { email: userInfo.user_email };
    const token: string = jwt.sign(userToken, "secret", { expiresIn: "1h" });
    if (!token) {
        return "Token Didn't get created";
    }
    return { userInfo, token };
}

export const registerService = async (inputUserDetail: userInfo): Promise<result> => {
    const existingUser: user = await (userQueries.getUserByEmail(inputUserDetail.user_email));
    if (existingUser) {
        return "User already exist.";
    }
    await userQueries.addUser(inputUserDetail);
    if (addressIsGiven(inputUserDetail)) {
        addAddressForUser(inputUserDetail);
    }
    const userInfo: user = await (userQueries.getUserByEmail(inputUserDetail.user_email));
    const userToken = { email: userInfo.user_email };
    const token: string = jwt.sign(userToken, "secret", { expiresIn: "1h" });
    if (!token) {
        return "Token Didn't get created";
    }
    return { userInfo, token };
}

const addAddressForUser = async (inputUserDetail: userInfo) => {
    let addressId = ((await userQueries.getAddressId(inputUserDetail))).address_id;
    if (!addressId) {
        addressId = (await userQueries.addNewAddress(inputUserDetail)).address_id;
    }
    const userId: number | undefined = (await userQueries.getUserByEmail(inputUserDetail.user_email)).user_id;
    if (userId) {
        await userQueries.mapAddress(userId, addressId as number);
    }
}

const addressIsGiven = (fields: userInfo) => {
    let address = true;
    for (let key in fields) {
        if (fields[key as keyof userInfo] === "") {
            address = false;
            break;
        }
    }
    return address;
}