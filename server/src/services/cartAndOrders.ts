import * as cartQueries from "../repository/cartQueries";
import { getUserByEmail } from "../repository/userQueries";
import { CartModel, OrderModel, UserModel } from "../models/types";

export const getCartForUserService = async (user_email: string) => {
    const user: UserModel = await getUserByEmail(user_email!);
    let cart = await cartQueries.getCartDataForUser(user.user_id!);
    return cart;
}

export const addProductToCartService = async (values: CartModel) => {
    const { user_id, product_name, product_size, product_color, product_price_per_unit } = values;
    const productUpdate: CartModel = {
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
    const addedProduct = await cartQueries.getProduct(values);
    return addedProduct
}

export const updateCartService = async (product: CartModel) => {
    if (product.quantity == 0) {
        await cartQueries.deleteFromCart(product);
        return;
    }
    const addedProduct = await cartQueries.getProduct(product);
    console.log(addedProduct.quantity);
    await cartQueries.updateCart(product);
    console.log(addedProduct.quantity);
    const updatedProduct = await cartQueries.getProduct(product);
    console.log(addedProduct.quantity);
    return updatedProduct;
}

export const placeOrderService = async (order: OrderModel) => {
    await cartQueries.placeOrder(order);
}


export const getAllOrdersForUserService = async (user_email: string) => {
    const user: UserModel = await getUserByEmail(user_email);
    let orders = await cartQueries.getAllOrdersForUser(user.user_id!);
    return orders;
}