import { user, cart } from "../types";
import { runQuery } from "./queries";
import { getUserByEmail } from "./userQueries";

let sql = "";
//Get cart
export const getCartDataForUser = async (user_email: string): Promise<cart[] | null> => {
    const user: user = await getUserByEmail(user_email);
    sql = `SELECT * FROM to_buy WHERE (to_buy.user_id = ${user.user_id} && to_buy.order_date IS NULL)`;
    let cart = (await runQuery(sql)) as cart[];
    if (!cart) {
        console.log("empty cart")
        return null;
    }
    return cart;
}

export const addToCart = async (user_id: number, product_name: string, product_size: string, product_color: string, product_price_per_unit: number, quantity: number) => {
    sql = `SELECT * FROM to_buy WHERE (user_id = ${user_id} && product_name='${product_name}' && product_color='${product_color}' && product_size='${product_size}' && order_date IS NULL)`;
    const product = (await runQuery(sql))[0] as cart;
    if (product) {
        console.log("going to update")
        updateCart(user_id, product_name, product_color, product_size, product.quantity + 1);
        return;
    }
    sql = `INSERT INTO to_buy (user_id, product_name, product_size, product_color, product_price_per_unit) VALUES (${user_id}, '${product_name}', '${product_size}', '${product_color}', ${product_price_per_unit})`
    const productAdded = await runQuery(sql) as cart[];
    return;
}
export const getAllOrdersForUser = async (user_email: string): Promise<object | null> => {
    const user: user = await getUserByEmail(user_email);
    sql = `SELECT * FROM to_buy WHERE (to_buy.user_id = ${user.user_id} && to_buy.order_date IS NOT NULL)`;
    const order: object = (await runQuery(sql));
    if (!order) {
        console.log("No order")
        return null;
    }
    return order;
}

export const updateCart = async (user_id: number, product_name: string, color: string, size: string, quantity: number) => {
    console.log("update")
    if (quantity == 0) {
        console.log(quantity);
        deleteFromCart(user_id, product_name, color, size);
        return;
    }
    sql = `UPDATE to_buy SET quantity=${quantity} WHERE (user_id=${user_id} && product_name = '${product_name}' && product_color='${color}' && product_size='${size}' && order_date IS NULL)`;
    await runQuery(sql);
}

export const deleteFromCart = async (user_id: number, product_name: string, color: string, size: string) => {
    console.log("in delete");
    sql = `DELETE FROM to_buy WHERE (user_id = ${user_id} && product_name='${product_name}' && product_color='${color}' && product_size='${size}' && order_date IS NULL)`;
    await runQuery(sql);
    return;
}

export const placeOrder = async (user_id: number, address_id: number, total_amount: number) => {
    sql = `UPDATE to_buy SET order_date=NOW(), address_id=${address_id}, total=${total_amount} WHERE (user_id=${user_id} && order_date IS NULL)`;
    await runQuery(sql);
    return;
}