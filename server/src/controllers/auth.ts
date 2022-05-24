import { NextFunction, Request, Response } from "express";
import { loginService, registerService } from "../services/auth";
import { LoginDetailModel, Result, UserInfoModel } from "../models/types";

//Login
export const login = async (req: Request, res: Response) => {
    const input = new LoginDetailModel(req.body);
    const data: Result = await loginService(input);
    return res.send(data);
}

//Register
export const register = async (req: Request, res: Response) => {
    const input = new UserInfoModel(req.body);
    const data: Result = await registerService(input);
    return res.send(data);
}