import { NextFunction, Request, Response } from "express";
import { addProductToCartService, getCartForUserService, placeOrderService, updateCartService } from "../services/cartAndOrders";

export const getCartForUser = async (req: Request, res: Response) => {
    const { user_email } = req.body;
    let cart = await getCartForUserService(user_email);
    return res.send(cart);
}

export const addProductToCart = (req: Request, res: Response) => {
    const { user_id, product_name, product_size, product_color, product_price_per_unit, quantity }: { user_id: number, product_name: string, product_size: string, product_color: string, product_price_per_unit: number, quantity: number } = req.body;
    const data = addProductToCartService(user_id, product_name, product_size, product_color, product_price_per_unit, 1);
    return res.send(data);
}

export const updateCart = (req: Request, res: Response) => {
    const { user_id, product_name, color, size, quantity }: { user_id: number, product_name: string, color: string, size: string, quantity: number } = req.body;
    updateCartService(user_id, product_name, color, size, quantity);
    return;
}

export const placeOrder = (req: Request, res: Response) => {
    const { user_id, address_id, total }: { user_id: number, address_id: number, total: number } = req.body;
    placeOrderService(user_id, address_id, total);
    return res.send("order placed");
}