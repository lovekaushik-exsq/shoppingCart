import { NextFunction, Request, Response } from "express";
import * as queries from "../queries/queries";

export const getAddressOfUser = async (req: Request, res: Response) => {
    const { user_email } = req.body;
    return res.send(await queries.getAllAddressOfUser(user_email));
}

export const getCartForUser = async (req: Request, res: Response) => {
    const { user_email } = req.body;
    let cart = await queries.getCartDataForUser(user_email);
    console.log(cart)
    return res.send(cart);
}

export const getAllOrdersForUser = async (req: Request, res: Response) => {
    const { user_email } = req.body;
    let allOrders = await queries.getAllOrdersForUser(user_email);
    console.log(allOrders);
    return res.send(allOrders);
}