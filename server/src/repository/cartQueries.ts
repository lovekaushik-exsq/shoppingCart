import { cartModel, orderModel } from "../models/types";
import { runQuery } from "./queries";

let sql = "";
//Get cart
export const getCartDataForUser = async (id: number): Promise<cartModel[]> => {
    sql = `SELECT * FROM to_buy WHERE (to_buy.user_id = ${id} && to_buy.order_date IS NULL)`;
    let cart = (await runQuery(sql)) as cartModel[];
    return cart;
}

//Add to cart
export const getProduct = async (product: cartModel) => {
    sql = `SELECT * FROM to_buy WHERE (user_id = ${product.user_id} && product_name='${product.product_name}' && product_color='${product.product_color}' && product_size='${product.product_size}' && order_date IS NULL)`;
    return (await runQuery(sql))[0] as cartModel;
}

export const addToCart = async (product: cartModel) => {
    sql = `INSERT INTO to_buy (user_id, product_name, product_size, product_color, product_price_per_unit) VALUES (${product.user_id}, '${product.product_name}', '${product.product_size}', '${product.product_color}', ${product.product_price_per_unit})`
    await runQuery(sql) as cartModel[];
}

//Update cart
export const updateCart = async (product: cartModel) => {
    sql = `UPDATE to_buy SET quantity=${product.quantity} WHERE (user_id=${product.user_id} && product_name = '${product.product_name}' && product_color='${product.product_color}' && product_size='${product.product_size}' && order_date IS NULL)`;
    await runQuery(sql);
}

//delete from cart
export const deleteFromCart = async (product: cartModel) => {
    sql = `DELETE FROM to_buy WHERE (user_id = ${product.user_id} && product_name='${product.product_name}' && product_color='${product.product_color}' && product_size='${product.product_size}' && order_date IS NULL)`;
    await runQuery(sql);
}

//place order
export const placeOrder = async (order: orderModel) => {
    sql = `UPDATE to_buy SET order_date=NOW(), address_id=${order.address_id}, total=${order.total_amount} WHERE (user_id=${order.user_id} && order_date IS NULL)`;
    await runQuery(sql);
}


//Get orders
export const getAllOrdersForUser = async (id: number): Promise<cartModel[]> => {
    sql = `SELECT * FROM to_buy WHERE (to_buy.user_id = ${id} && to_buy.order_date IS NOT NULL)`;
    let orders = (await runQuery(sql)) as cartModel[];
    return orders;
}
// export const getAllOrdersForUser = async (user_email: string): Promise<object | null> => {
//     const user: user = await getUserByEmail(user_email);
//     sql = `SELECT * FROM to_buy WHERE (to_buy.user_id = ${user.user_id} && to_buy.order_date IS NOT NULL)`;
//     const order: object = (await runQuery(sql));
//     if (!order) {
//         console.log("No order")
//         return null;
//     }
//     return order;
// }