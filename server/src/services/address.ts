import * as userQueries from "../repository/userQueries";
import { country, state, city } from "../types";

export const getAllAddressOfUserService = async (user_email: string) => {
    const userId = (await userQueries.getUserByEmail(user_email)).user_id;
    if (!userId) {
        return "no such user exist";
    }
    const allAddress = await userQueries.getAllAddressOfUser(userId);
    return allAddress;
}

export const addNewAddressService = async (user_email: string, address: string, city: string, state: string, zip_code: number, country: string) => {
    let addressId = (await userQueries.addNewAddress({ address, city, state, zip_code, country })).address_id;
    let userId = (await userQueries.getUserByEmail(user_email)).user_id!;
    await userQueries.mapAddress(userId, addressId as number);
    return addressId as number;
}

export const getAllCountriesService = async () => {
    const countries: country[] = await userQueries.getAllCountries();
    return countries;
}

export const getStatesForService = async (country_id: number) => {
    const state: state[] = await userQueries.getStatesFor(country_id);
    return state;
}

export const getCitiesForService = async (state_id: number) => {
    const city: city[] = await userQueries.getCitiesFor(state_id);
    return city;
}