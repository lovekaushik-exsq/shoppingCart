import { NextFunction, Request, Response } from "express";
import { getUserByEmailService, loginService, registerService, updateUserByEmailService } from "../services/auth";
import { LoginDetailModel, Result, UserInfoModel, UserModel } from "../models/types";
//Login
export const login = async (req: Request, res: Response) => {
    const input = new LoginDetailModel(req.body);
    const data: (Result | string) = await loginService(input);
    return res.send(data);
}

//Register
export const register = async (req: Request, res: Response) => {
    const input = new UserInfoModel(req.body);
    const data: Result | string = await registerService(input);
    return res.send(data);
}

export const getUserByEmail = async (req: Request, res: Response) => {
    const user_email = req.query.userEmail as string;
    const data: UserModel | string = await getUserByEmailService(user_email);
    return res.send(data);
}

export const updateUserByEmail = async (req: Request, res: Response) => {
    const user = new UserModel(req.body);
    const data: UserModel | string = await updateUserByEmailService(user);
    return res.send(data);
}