import { userRegistration, user, productType } from "../types";

// import axios from "axios";
const axios = require('axios');
const API = axios.create({ baseURL: "http://localhost:5000" });



export const login = (params: { user_email: string, user_password: string }) => API.post('/auth/login', params);

export const getAllCountries = () => API.get('/address/getAllCountries');
export const getStatesFor = (country_id: number) => API.get('/address/getStatesFor', { params: { country_id } });
export const getCitiesFor = (state_id: number) => API.get('/address/getCitiesFor', { params: { state_id } });
export const getAllAddressOfUser = (user_email: string) => API.get('/address/getAllAddressOfUser', { params: { user_email } });
export const addNewAddress = (address: {
    user_email: string,
    address: string,
    city: string,
    state: string,
    zip_code: string,
    country: string
}) => API.post('/address/addNewAddress', address);
export const register = (params: userRegistration) => API.post('/auth/register', params);

export const getAllProducts = () => API.get('/products/getAllProducts');
export const getProductById = (id: { id: number }) => API.post('/products/getProductById', id);
export const getAllProductsBy = (type: { type: string | null }) => API.post('/products/getAllProductsBy', type);
export const searchProductBy = (searchParams: { searchValue: string, data: productType[] }) => API.post('/products/searchProductBy', searchParams);
export const getAllFiltersOfProducts = () => API.get('products/getAllFiltersOfProducts');
export const filterTheProducts = (param: {
    colors: string[],
    size: string[],
    items: productType[]
}) => API.post('products/filterTheProducts', param)

export const getCart = (user_email: string) => API.get(`/order/getCart`, { params: { user_email } });

export const addProductToCart = (data: {
    user_id: number,
    product_name: string,
    product_size: string,
    product_color: string,
    product_price_per_unit: number
}) => API.post('/order/addProductToCart', data);

export const getQuantityOfProducts = (data: any) => API.post('products/getQuantityOfProducts', data);

export const updateCart = (data: {
    user_id: number,
    product_name: string,
    product_color: string,
    product_size: string,
    quantity: number
}) => API.post('/order/updateCart', data);

export const placeOrder = (data: {
    user_id: number,
    address_id: number,
    total_amount: number
}) => API.post('/order/placeOrder', data);


export const getProductsOnScreen = () => API.get('products/getProductsOnScreen');
export const setProductsOnScreen = (data: { productsOnScreen: productType[] }) => API.post('products/setProductsOnScreen', data);
export const updateProduct = (data: { name: string, color: string, size: string, quantity: number }) => API.post('products/updateProduct', data);