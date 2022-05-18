import { NextFunction, Request, Response } from "express";
import { addProductToCartService, getCartForUserService, placeOrderService, updateCartService } from "../services/cartAndOrders";

export const getCartForUser = async (req: Request, res: Response) => {
    const user_email = req.query.user_email as string;
    let cart = await getCartForUserService(user_email);
    return res.send(cart);
}

export const addProductToCart = async (req: Request, res: Response) => {
    await addProductToCartService(req.body);
    return res.send("product added to cart");
}

export const updateCart = async (req: Request, res: Response) => {
    await updateCartService(req.body);
    return res.send("cart updated");
}

export const placeOrder = async (req: Request, res: Response) => {
    await placeOrderService(req.body);
    return res.send("order placed");
}