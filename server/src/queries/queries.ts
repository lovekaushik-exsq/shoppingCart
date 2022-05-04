import { connection } from "../sqlconfig/connection";

interface user {
    [key: string]: any;
}
interface address {
    [key: string]: any;
}

//Running the sql queries
const runQuery = async (sql: string): Promise<object[]> => {
    return await new Promise(
        (resolve, reject) => connection.query(sql, (err: Error, result: object) => {
            if (err) { reject(err); }
            resolve(result);
        })
    ).then(val => JSON.parse(JSON.stringify(val)));
}

let sql: string = "";

//Get all users
export const getAllUsers = async (): Promise<object[]> => {
    sql = `SELECT * FROM user_info`;
    const users: object[] = await runQuery(sql);
    return users;
}

//Get a user by email
export const getUserByEmail = async (user_email: string): Promise<user> => {
    sql = `SELECT * FROM user_info WHERE(user_info.user_email = '${user_email}')`;
    const user: object[] = await runQuery(sql);
    return user[0];
}

// Add user to db
export const addUser = async (user_name: string, user_email: string, user_password: string, user_phone_number: string): Promise<object> => {
    sql = `INSERT INTO user_info (user_name, user_email, user_password, user_phone_number) VALUES ('${user_name}', '${user_email}', '${user_password}', '${user_phone_number}')`;
    const user: object[] = await runQuery(sql);
    return await getUserByEmail(user_email);
}

// Add user address
export const addUserAddress = async (user_email: string, address: string, city: string, state: string, zip_code: number, country: string): Promise<void> => {
    const sqlForAddressID = `SELECT address.address_id FROM address WHERE (address.address = '${address}' && address.city = '${city}' && address.state = '${state}' && address.zip_code = ${zip_code} && address.country = '${country}')`;
    let address_id: address = (await runQuery(sqlForAddressID))[0];
    if (!address_id) {
        sql = `INSERT INTO address (address,city,state,zip_code,country) VALUES ('${address}', '${city}', '${state}', ${zip_code}, '${country}')`;
        const userAddress = await runQuery(sql);
        address_id = (await runQuery(sqlForAddressID))[0];
    }
    const user: user = await getUserByEmail(user_email);
    sql = `INSERT INTO user_address VALUES (${user.user_id}, ${address_id.address_id})`;
    const addressAssigned = await runQuery(sql);
}

//Get all address of an user
export const getAllAddressOfUser = async (user_email: string): Promise<object | string> => {
    sql = `SELECT user_info.user_id FROM user_info WHERE (user_info.user_email = '${user_email}')`;
    let user_id: user = (await runQuery(sql))[0];
    if (!user_id) {
        return "no such user exist";
    }
    sql = `Select address.address, address.city, address.state, address.zip_code, address.country FROM address JOIN user_address ON (address.address_id = user_address.address_id) WHERE (user_address.user_id = ${user_id.user_id})`;
    const allAddress: object[] = await runQuery(sql);
    return allAddress;
}

//Get cart
export const getCartDataForUser = async (user_email: string): Promise<object | null> => {
    const user: user = await getUserByEmail(user_email);
    sql = `SELECT * FROM to_buy WHERE (to_buy.user_id = ${user.user_id} && to_buy.order_date IS NULL)`;
    let cart = (await runQuery(sql))[0];
    if (!cart) {
        console.log("empty cart")
        return null;
    }
    return cart;
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