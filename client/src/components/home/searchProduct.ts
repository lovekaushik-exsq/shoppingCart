import * as api from "../../api/index";
import { showProducts } from "../product/products";
import { ProductTypeModel } from "../../models/types";
import { makeArray } from "../../utilities/generalFunction";

export const search = async () => {
    const result: ProductTypeModel[] = await getSearchedProducts();
    console.log("search", result);
    showProducts(result);
}

export const getSearchedProducts = async () => {
    let productOnScreen: ProductTypeModel[] = makeArray((await api.getProductsOnScreen()).data, ProductTypeModel);
    const searchValue = (<HTMLInputElement>document.getElementById('searchBar')).value;
    const searchParams = {
        searchValue,
        data: productOnScreen
    }
    localStorage.setItem('search', searchValue);
    const data: ProductTypeModel[] = makeArray((await api.searchProductBy(searchParams)).data, ProductTypeModel);
    await api.setProductsOnScreen({ productsOnScreen: data });
    return data;
}