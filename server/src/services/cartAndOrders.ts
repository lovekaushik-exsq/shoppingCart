import * as cartQueries from "../repository/cartQueries";
import { getUserByEmail } from "../repository/userQueries";
import { cart, order, user } from "../types";

export const getCartForUserService = async (user_email: string) => {
    const user: user = await getUserByEmail(user_email);
    let cart = await cartQueries.getCartDataForUser(user.user_id!);
    return cart;
}

export const addProductToCartService = async (values: cart) => {
    const { user_id, product_name, product_size, product_color, product_price_per_unit } = values;
    const productUpdate: cart = {
        user_id,
        product_name,
        product_size,
        product_color,
        product_price_per_unit,
        quantity: 1
    }
    let productExistInCart = await cartQueries.getProduct(values);
    if (productExistInCart) {
        productUpdate.quantity += productExistInCart.quantity;
        await cartQueries.updateCart(productUpdate);
        return;
    }
    await cartQueries.addToCart(values);
}

export const updateCartService = async (product: cart) => {
    if (product.quantity == 0) {
        await cartQueries.deleteFromCart(product);
        return;
    }
    await cartQueries.updateCart(product);
}

export const placeOrderService = async (order: order) => {
    await cartQueries.placeOrder(order);
}