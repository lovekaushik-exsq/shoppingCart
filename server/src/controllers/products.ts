import { NextFunction, Request, Response } from "express";
import products from "../products";
import { ProductTypeModel } from "../models/types";
import { filterTheProductsService, getAllFilterOfProductsService, getAllProductsByService, getProductByIdService, getProductsOnScreenService, getQuantityOfProductsService, searchProductByService, setProductsOnScreenService, updateProductService } from "../services/products";
import { makeArray } from "../utilities/modal";
export const getAllProducts = (req: Request, res: Response) => {
    return res.send(products);
}
export const getAllProductsBy = (req: Request, res: Response) => {
    const type = req.query.type as string;
    const data = getAllProductsByService(type);
    res.send(data);
}

export const getProductById = (req: Request, res: Response) => {
    const id = Number(req.query.id);
    const data = getProductByIdService(id);
    res.send(data);
}

export const searchProductBy = (req: Request, res: Response) => {
    const { searchValue, data } = req.body;
    const products: ProductTypeModel[] = makeArray(data, ProductTypeModel);
    const result = searchProductByService(searchValue, products);
    res.send(result);
}

export const getAllFilterOfProducts = (req: Request, res: Response) => {
    let data = getAllFilterOfProductsService();
    res.send(data);
}

export const filterTheProducts = (req: Request, res: Response) => {
    const { colors, size, items } = req.body;
    const products: ProductTypeModel[] = makeArray(items, ProductTypeModel);
    let data = filterTheProductsService(colors, size, products);
    res.send(data);
}

export const getQuantityOfProducts = (req: Request, res: Response) => {
    const { productName, color, size } = req.body;
    const product_name = productName;
    let quantity: number = getQuantityOfProductsService(product_name, color, size);
    res.send(quantity.toString());
}

export const getProductsOnScreen = (req: Request, res: Response) => {
    const data = getProductsOnScreenService();
    return res.send(data);
}

export const setProductsOnScreen = (req: Request, res: Response) => {
    const { productsOnScreen } = req.body;
    const products: ProductTypeModel[] = makeArray(productsOnScreen, ProductTypeModel);
    const data = setProductsOnScreenService(products);
    return res.send(data);
}

export const updateProduct = (req: Request, res: Response) => {
    const { name, color, size, quantity }: { name: string, color: string, size: string, quantity: number } = req.body;
    const data = updateProductService(name, color, size, quantity);
    return res.send(data);
}