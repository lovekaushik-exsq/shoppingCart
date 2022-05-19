import { NextFunction, Request, Response } from "express";
import { loginService, registerService } from "../services/auth";
import { loginDetailModel, result, userInfoModel } from "../models/types";

//Login
export const login = async (req: Request, res: Response) => {
    const input = new loginDetailModel(req.body);
    const { user_email, user_password } = input;
    const data: result = await loginService({ user_email, user_password });
    return res.send(data);
}

//Register
export const register = async (req: Request, res: Response) => {
    const input = new userInfoModel(req.body);
    const data: result = await registerService(input);
    return res.send(data);
}