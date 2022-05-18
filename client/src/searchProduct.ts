import * as api from "./api/index";
import { showProducts } from "./products";
import { productType } from "./types";

export const search = async () => {
    const result = await getSearchedProducts();
    console.log("search", result);
    showProducts(result);
}

export const getSearchedProducts = async () => {
    let productOnScreen = (await api.getProductsOnScreen()).data;
    const searchValue = (<HTMLInputElement>document.getElementById('searchBar')).value;
    const searchParams = {
        searchValue,
        data: productOnScreen
    }
    localStorage.setItem('search', searchValue);
    const { data }: { data: productType[] } = await api.searchProductBy(searchParams);
    await api.setProductsOnScreen({ productsOnScreen: data });
    return data;
}