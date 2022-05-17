import * as queries from "../repository/userQueries";
import { country, state, city } from "../types";

export const getAllAddressOfUserService = async (user_email: string) => {
    const allAddress = await queries.getAllAddressOfUser(user_email);
    return allAddress;
}

export const addNewAddressService = (user_email: string, address: string, city: string, state: string, zip_code: number, country: string) => {
    const addressId = queries.addUserAddress(user_email, address, city, state, zip_code, country);
    return addressId;
}

export const getAllCountriesService = async () => {
    const countries: country[] = await queries.getAllCountries();
    return countries;
}

export const getStatesForService = async (country_id: number) => {
    const state: state[] = await queries.getStatesFor(country_id);
    return state;
}

export const getCitiesForService = async (state_id: number) => {
    const city: city[] = await queries.getCitiesFor(state_id);
    return city;
}