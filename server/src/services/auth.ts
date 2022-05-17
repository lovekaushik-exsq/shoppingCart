import * as queries from "../repository/userQueries";
import { loginDetail, user, userInfo, result } from "../types";
const jwt = require("jsonwebtoken");

export const loginService = async (inputUserDetail: loginDetail): Promise<result> => {
    const userInfo: user = await queries.getUserByEmail(inputUserDetail.user_email);
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
    const existingUser: user = await (queries.getUserByEmail(inputUserDetail.user_email));
    if (existingUser) {
        return "User already exist.";
    }
    const userInfo: user = await queries.addUser(inputUserDetail.user_name, inputUserDetail.user_email, inputUserDetail.user_password, inputUserDetail.user_phone_number);
    await queries.addUserAddress(inputUserDetail.user_email, inputUserDetail.address, inputUserDetail.city, inputUserDetail.state, inputUserDetail.zip_code, inputUserDetail.country);
    const userToken = { email: userInfo.user_email };
    const token: string = jwt.sign(userToken, "secret", { expiresIn: "1h" });
    if (!token) {
        return "Token Didn't get created";
    }
    return { userInfo, token };
}