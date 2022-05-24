import { NextFunction, Request, Response } from "express";
import { addProductToCartService, getAllOrdersForUserService, getCartForUserService, placeOrderService, updateCartService } from "../services/cartAndOrders";
import { CartModel, OrderModel } from "../models/types";

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
    const product = new CartModel(req.body);
    const addedProduct = await addProductToCartService(product);
    return res.send(addedProduct);
}

export const updateCart = async (req: Request, res: Response) => {
    const product = new CartModel(req.body);
    const updatedProduct = await updateCartService(product);
    return res.send(updatedProduct);
}

export const placeOrder = async (req: Request, res: Response) => {
    const order = new OrderModel(req.body);
    await placeOrderService(order);
    return res.send("order placed");
}