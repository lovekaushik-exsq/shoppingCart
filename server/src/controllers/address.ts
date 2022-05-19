import { NextFunction, Request, Response } from "express";
import { getAllCountriesService, getStatesForService, getCitiesForService, getAllAddressOfUserService, addNewAddressService } from "../services/address";
import { countryModel, stateModel, cityModel } from "../models/types";

export const getAllCountries = async (req: Request, res: Response) => {
    const data: countryModel[] = await getAllCountriesService();
    res.send(data);
}

export const addNewAddress = async (req: Request, res: Response) => {
    const { userEmail, address, city, state, zipCode, country } = req.body;
    const user_email = userEmail;
    const zip_code = zipCode;
    const data: number = await addNewAddressService(user_email, address, city, state, zip_code, country);
    return res.send(data.toString());
}

export const getStatesFor = async (req: Request, res: Response) => {
    const country_id = Number(req.query.countryId as string);
    const data: stateModel[] = await getStatesForService(country_id);
    res.send(data);
}

export const getCitiesFor = async (req: Request, res: Response) => {
    const state_id = Number(req.query.stateId as string);
    const data: cityModel[] = await getCitiesForService(state_id);
    res.send(data);
}

export const getAllAddressOfUser = async (req: Request, res: Response) => {
    const user_email = req.query.userEmail as string;
    const allAddress = await getAllAddressOfUserService(user_email);
    res.send(allAddress);
}