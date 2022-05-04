import { NextFunction, Request, Response } from "express";
import * as queries from "../queries/queries";

//Register
export const register = async (req: Request, res: Response) => {
    const { user_name, user_email, user_password, user_phone_number, address, city, state, zip_code, country } = req.body;
    if (!user_name || !user_email || !user_password) {
        return res.send("All fields are required.");
    }
    try {
        const existingUser: any = await queries.getUserByEmail(user_email);
        if (existingUser) {
            return res.send("User already exist.");
        }
        const newUser = await queries.addUser(user_name, user_email, user_password, user_phone_number);
        const userAddress = await queries.addUserAddress(user_email, address, city, state, zip_code, country);
        res.send("user created successfully");
    } catch (error) {
        console.log(error);
    }
}

//Login
export const login = async (req: Request, res: Response) => {
    const { user_email, user_password } = req.body;
    if (!user_email || !user_password) {
        return res.send("Fill all required fields");
    }

    const existingUser = await queries.getUserByEmail(user_email);
    console.log("existingUser: ", existingUser);

    if (!existingUser) {
        console.log("User doesn't exist.");
        return res.send("User doesn't exist.");
    }
    if (user_password != existingUser!.user_password) {
        return res.send("Password doesn't match.");
    }
    console.log("logged in");
    res.send(existingUser);
}