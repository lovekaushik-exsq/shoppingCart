import * as cartQueries from "../repository/cartQueries";
import { getUserByEmail } from "../repository/userQueries";
import { cartModel, orderModel, userModel } from "../models/types";

export const getCartForUserService = async (user_email: string) => {
    const user: userModel = await getUserByEmail(user_email);
    let cart = await cartQueries.getCartDataForUser(user.user_id!);
    return cart;
}

export const addProductToCartService = async (values: cartModel) => {
    const { user_id, product_name, product_size, product_color, product_price_per_unit } = values;
    const productUpdate: cartModel = {
        user_id,
        product_name,
        product_size,
        product_color,
        product_price_per_unit,
        quantity: 1
    }
    let productExistInCart = await cartQueries.getProduct(values);
    if (productExistInCart) {
        productUpdate.quantity! += productExistInCart.quantity!;
        await cartQueries.updateCart(productUpdate);
        return;
    }
    await cartQueries.addToCart(values);
}

export const updateCartService = async (product: cartModel) => {
    if (product.quantity == 0) {
        await cartQueries.deleteFromCart(product);
        return;
    }
    await cartQueries.updateCart(product);
}

export const placeOrderService = async (order: orderModel) => {
    await cartQueries.placeOrder(order);
}


export const getAllOrdersForUserService = async (user_email: string) => {
    const user: userModel = await getUserByEmail(user_email);
    let orders = await cartQueries.getAllOrdersForUser(user.user_id!);
    return orders;
}