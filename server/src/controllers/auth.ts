import { NextFunction, Request, Response } from "express";
import { loginService, registerService } from "../services/auth";
import { loginDetail, result } from "../types";

//Register
export const register = async (req: Request, res: Response): Promise<Response<result, Record<string, result>>> => {
    const { user_name, user_email, user_password, user_phone_number, address, city, state, zip_code, country } = req.body;
    const data: result = await registerService({ user_name, user_email, user_password, user_phone_number, address, city, state, zip_code, country });
    return res.send(data);
}

//Login
export const login = async (req: Request, res: Response): Promise<Response<result, Record<string, result>>> => {
    const { user_email, user_password }: loginDetail = req.body;
    const data: result = await loginService({ user_email, user_password });
    return res.send(data);
}