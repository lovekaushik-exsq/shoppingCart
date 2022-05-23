import { NextFunction, Request, Response } from "express";
import { addProductToCartService, getAllOrdersForUserService, getCartForUserService, placeOrderService, updateCartService } from "../services/cartAndOrders";
import { cartModel, orderModel } from "../models/types";

export const getCartForUser = async (req: Request, res: Response) => {
    const user_email = req.query.userEmail as string;
    let cart = await getCartForUserService(user_email);
    return res.send(cart);
}

export const getAllOrdersForUser = async (req: Request, res: Response) => {
    const user_email = req.query.userEmail as string;
    let orders = await getAllOrdersForUserService(user_email);
    return res.send(orders);
}

export const addProductToCart = async (req: Request, res: Response) => {
    const product: cartModel = new cartModel(req.body);
    await addProductToCartService(product);
    return res.send("product added to cart");
}

export const updateCart = async (req: Request, res: Response) => {
    const product: cartModel = new cartModel(req.body);
    await updateCartService(product);
    return res.send("cart updated");
}

export const placeOrder = async (req: Request, res: Response) => {
    const order: orderModel = new orderModel(req.body);
    await placeOrderService(order);
    return res.send("order placed");
}