import { NextFunction, Request, Response } from "express";
import { loginService, registerService } from "../services/auth";
import { loginDetail, result } from "../types";

//Register
export const register = async (req: Request, res: Response) => {
    const data: result = await registerService(req.body);
    return res.send(data);
}

//Login
export const login = async (req: Request, res: Response) => {
    const { user_email, user_password }: loginDetail = req.body;
    const data: result = await loginService({ user_email, user_password });
    return res.send(data);
}