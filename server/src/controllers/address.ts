import { NextFunction, Request, Response } from "express";
import { AddressModel } from "../models/types";
import { getAllCountriesService, getStatesForService, getCitiesForService, getAllAddressOfUserService, addNewAddressService } from "../services/address";

export const getAllCountries = async (req: Request, res: Response) => {
    const data = await getAllCountriesService();
    res.send(data);
}

export const addNewAddress = async (req: Request, res: Response) => {
    const newAddress = new AddressModel(req.body);
    const data = await addNewAddressService(newAddress);
    return res.send(data.toString());
}

export const getStatesFor = async (req: Request, res: Response) => {
    const country_id = +req.query.countryId!;
    const data = await getStatesForService(country_id);
    res.send(data);
}

export const getCitiesFor = async (req: Request, res: Response) => {
    const state_id = +req.query.stateId!;
    const data = await getCitiesForService(state_id);
    res.send(data);
}

export const getAllAddressOfUser = async (req: Request, res: Response) => {
    const user_email = req.query.userEmail as string;
    const allAddress = await getAllAddressOfUserService(user_email);
    res.send(allAddress);
}