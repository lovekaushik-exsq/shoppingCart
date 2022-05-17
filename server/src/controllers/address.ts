import { NextFunction, Request, Response } from "express";
import { getAllCountriesService, getStatesForService, getCitiesForService, getAllAddressOfUserService, addNewAddressService } from "../services/address";
import { country, state, city } from "../types";

export const getAllCountries = async (req: Request, res: Response) => {
    const data: country[] = await getAllCountriesService();
    res.send(data);
}

export const addNewAddress = async (req: Request, res: Response) => {
    const { user_email, address, city, state, zip_code, country } = req.body;
    const data: number = await addNewAddressService(user_email, address, city, state, zip_code, country);
    return res.send(data.toString());
}

export const getStatesFor = async (req: Request, res: Response) => {
    const { country_id } = req.body;
    const data: state[] = await getStatesForService(country_id);
    res.send(data);
}

export const getCitiesFor = async (req: Request, res: Response) => {
    const { state_id } = req.body;
    const data: city[] = await getCitiesForService(state_id);
    res.send(data);
}

export const getAllAddressOfUser = async (req: Request, res: Response) => {
    const { user_email } = req.body;
    const allAddress = await getAllAddressOfUserService(user_email);
    res.send(allAddress);
}