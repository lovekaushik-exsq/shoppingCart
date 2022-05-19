import * as api from "../../api/index";
import { showProducts } from "../product/products";
import { makeArray, productTypeModel } from "../../models/types";

export const search = async () => {
    const result: productTypeModel[] = await getSearchedProducts();
    console.log("search", result);
    showProducts(result);
}

export const getSearchedProducts = async () => {
    let productOnScreen: productTypeModel[] = makeArray((await api.getProductsOnScreen()).data, productTypeModel);
    const searchValue = (<HTMLInputElement>document.getElementById('searchBar')).value;
    const searchParams = {
        searchValue,
        data: productOnScreen
    }
    localStorage.setItem('search', searchValue);
    const data: productTypeModel[] = makeArray((await api.searchProductBy(searchParams)).data, productTypeModel);
    await api.setProductsOnScreen({ productsOnScreen: data });
    return data;
}