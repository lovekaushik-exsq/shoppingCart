import { AddressModel } from "../models/types";
import * as userQueries from "../repository/userQueries";
import * as messages from "../constants/messages";

export const getAllAddressOfUserService = async (user_email: string) => {
    const user_id = (await userQueries.getUserByEmail(user_email)).user_id;
    if (!user_id) {
        return messages.noUser;
    }
    const allAddress = await userQueries.getAllAddressOfUser(user_id);
    return allAddress;
}

export const addNewAddressService = async (input: AddressModel) => {
    if (input.user_email === null) {
        return messages.notAuthenticated;
    }
    let addressId = (await userQueries.addNewAddress(input)).address_id;
    let userId = (await userQueries.getUserByEmail(input.user_email!)).user_id!;
    await userQueries.mapAddress(userId, addressId as number);
    return +addressId!;
}

export const getAllCountriesService = async () => {
    const countries = await userQueries.getAllCountries();
    return countries;
}

export const getStatesForService = async (country_id: number) => {
    const state = await userQueries.getStatesFor(country_id);
    return state;
}

export const getCitiesForService = async (state_id: number) => {
    const city = await userQueries.getCitiesFor(state_id);
    return city;
}