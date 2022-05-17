import { productType } from "./types"

let data: productType[];
export const getProductsOnScreen = () => {
    return data;
}
export const setProductsOnScreen = (products: productType[]) => {
    data = products;
}