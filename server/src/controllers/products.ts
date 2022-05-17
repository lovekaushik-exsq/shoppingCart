import { NextFunction, Request, Response } from "express";
import products from "../products";
import { productType } from "../types";
import { filterTheProductsService, getAllFilterOfProductsService, getAllProductsByService, getProductByIdService, getProductsOnScreenService, getQuantityOfProductsService, searchProductByService, setProductsOnScreenService } from "../services/products";
export const getAllProducts = (req: Request, res: Response) => {
    return res.send(products);
}
export const getAllProductsBy = (req: Request, res: Response) => {
    const { type }: { type: string } = req.body;
    const data: productType[] = getAllProductsByService(type);
    res.send(data);
}

export const getProductById = (req: Request, res: Response) => {
    const { id } = req.body;
    const data: productType = getProductByIdService(id);
    res.send(data);
}

export const searchProductBy = (req: Request, res: Response) => {
    const { searchValue, data }: { searchValue: string, data: productType[] } = req.body;
    const result: productType[] = searchProductByService(searchValue, data);
    res.send(result);
}

export const getAllFilterOfProducts = (req: Request, res: Response) => {
    let data = getAllFilterOfProductsService();
    res.send(data);
}

export const filterTheProducts = (req: Request, res: Response) => {
    const { colors, size, items } = req.body;
    let data = filterTheProductsService(colors, size, items);
    res.send(data);
}

export const getQuantityOfProducts = (req: Request, res: Response) => {
    const { product_name, color, size } = req.body;
    let quantity = getQuantityOfProductsService(product_name, color, size);
    res.send(quantity.toString());
}

export const getProductsOnScreen = (req: Request, res: Response) => {
    const data = getProductsOnScreenService();
    return res.send(data);
}

export const setProductsOnScreen = (req: Request, res: Response) => {
    const { productsOnScreen } = req.body;
    const data = setProductsOnScreenService(productsOnScreen);
    return res.send(data);
}