import * as queries from "../repository/cartQueries";
export const getCartForUserService = async (user_email: string) => {
    let cart = await queries.getCartDataForUser(user_email);
    return cart;
}

export const addProductToCartService = async (user_id: number, product_name: string, product_size: string, product_color: string, product_price_per_unit: number, quantity: number) => {
    let cart = await queries.addToCart(user_id, product_name, product_size, product_color, product_price_per_unit, quantity);
    return;
}

export const updateCartService = async (user_id: number, product_name: string, product_color: string, product_size: string, quantity: number) => {
    await queries.updateCart(user_id, product_name, product_color, product_size, quantity);
    return;
}

export const placeOrderService = async (user_id: number, address_id: number, total_amount: number) => {
    await queries.placeOrder(user_id, address_id, total_amount);
    return;
}