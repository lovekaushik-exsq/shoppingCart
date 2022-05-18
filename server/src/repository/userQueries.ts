import { user, address, city, state, country } from "../types";
import { runQuery } from "./queries";

let sql = "";
//Get all users
export const getAllUsers = async (): Promise<user[]> => {
    sql = `SELECT * FROM user_info`;
    const users = (await runQuery(sql)) as user[];
    return users;
}

//Get a user by email
export const getUserByEmail = async (user_email: string): Promise<user> => {
    sql = `SELECT * FROM user_info WHERE(user_info.user_email = '${user_email}')`;
    const user = await runQuery(sql) as user[];
    return user[0];
}

// Add user to db
export const addUser = async (user: user) => {
    sql = `INSERT INTO user_info (user_name, user_email, user_password, user_phone_number) VALUES ('${user.user_name}', '${user.user_email}', '${user.user_password}', '${user.user_phone_number}')`;
    await runQuery(sql) as user[];
}

// Add user address

export const getAddressId = async (address: address) => {
    const sql = `SELECT address.address_id FROM address WHERE (address.address = '${address.address}' && address.city = '${address.city}' && address.state = '${address.state}' && address.zip_code = ${address.zip_code} && address.country = '${address.country}')`;
    let address_id = (await runQuery(sql))[0];
    return address_id as address;
}

export const addNewAddress = async (address: address) => {
    sql = `INSERT INTO address (address,city,state,zip_code,country) VALUES ('${address.address}', '${address.city}', '${address.state}', ${address.zip_code}, '${address.country}')`;
    await runQuery(sql) as address[];
    return await getAddressId(address);
}

export const mapAddress = async (user_id: number, address_id: number) => {
    sql = `INSERT INTO user_address VALUES (${user_id}, ${address_id})`;
    await runQuery(sql);
}

//Get all address of an user
export const getAllAddressOfUser = async (user_id: number): Promise<address[] | string> => {
    sql = `Select address.address_id, address.address, address.city, address.state, address.zip_code, address.country FROM address JOIN user_address ON (address.address_id = user_address.address_id) WHERE (user_address.user_id = ${user_id})`;
    const allAddress = await runQuery(sql) as address[];
    return allAddress;
}

//Get all countries
export const getAllCountries = async (): Promise<country[]> => {
    const sql = `SELECT * FROM countries`;
    const countries = (await runQuery(sql)) as country[];
    return countries;
}

//Get state for
export const getStatesFor = async (country_id: number): Promise<state[]> => {
    const sql = `SELECT * FROM states JOIN countries ON (countries.country_id = states.country_id) WHERE countries.country_id = ${country_id}`;
    const states = await runQuery(sql) as state[];
    return states;
}

export const getCitiesFor = async (state_id: number): Promise<city[]> => {
    const sql = `SELECT * FROM cities JOIN states ON (states.state_id = cities.state_id) WHERE states.state_id = ${state_id}`;
    const cities = await runQuery(sql) as city[];
    return cities;
}

