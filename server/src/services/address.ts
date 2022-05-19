import * as userQueries from "../repository/userQueries";
import { countryModel, stateModel, cityModel } from "../models/types";

export const getAllAddressOfUserService = async (user_email: string) => {
    const user_id = (await userQueries.getUserByEmail(user_email)).user_id;
    if (!user_id) {
        return "no such user exist";
    }
    const allAddress = await userQueries.getAllAddressOfUser(user_id);
    return allAddress;
}

export const addNewAddressService = async (user_email: string, address: string, city: string, state: string, zip_code: number, country: string) => {
    let addressId = (await userQueries.addNewAddress({ address, city, state, zip_code, country })).address_id;
    let userId = (await userQueries.getUserByEmail(user_email)).user_id!;
    await userQueries.mapAddress(userId, addressId as number);
    return addressId as number;
}

export const getAllCountriesService = async () => {
    const countries: countryModel[] = await userQueries.getAllCountries();
    return countries;
}

export const getStatesForService = async (country_id: number) => {
    const state: stateModel[] = await userQueries.getStatesFor(country_id);
    return state;
}

export const getCitiesForService = async (state_id: number) => {
    const city: cityModel[] = await userQueries.getCitiesFor(state_id);
    return city;
}