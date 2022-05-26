import { AxiosRequestConfig } from "../../node_modules/axios/index";
import { IUserInfo, IUserRegistration, ProductTypeModel } from "../models/types";
const axios = require('axios');
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req: AxiosRequestConfig) => {
    if (localStorage.getItem("profile")) {
        req.headers!.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")!).token
            }`;
    }

    return req;
});

export const login = (params: { userEmail: string, userPassword: string }) => API.post('/auth/login', params);
export const getUserByEmail = (userEmail: string) => API.get('/auth/getUserByEmail', { params: { userEmail } });
export const updateUser = (user: IUserInfo) => API.post('/auth/updateUser', user);
export const getAllCountries = () => API.get('/address/getAllCountries');
export const getStatesFor = (countryId: number) => API.get('/address/getStatesFor', { params: { countryId } });
export const getCitiesFor = (stateId: number) => API.get('/address/getCitiesFor', { params: { stateId } });
export const getAllAddressOfUser = (userEmail: string) => API.get('/address/getAllAddressOfUser', { params: { userEmail } });
export const addNewAddress = (address: {
    userEmail: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
}) => API.post('/address/addNewAddress', address);

export const register = (params: IUserRegistration) => API.post('/auth/register', params);

export const getAllProducts = () => API.get('/products/getAllProducts');
export const getProductById = (id: number) => API.get('/products/getProductById', { params: { id } });
export const getAllProductsBy = (type: string | null) => API.get('/products/getAllProductsBy', { params: { type } });
export const searchProductBy = (searchParams: { searchValue: string, data: ProductTypeModel[] }) => API.post('/products/searchProductBy', searchParams);
export const getAllFiltersOfProducts = () => API.get('products/getAllFiltersOfProducts');
export const filterTheProducts = (param: {
    colors: string[],
    size: string[],
    items: ProductTypeModel[]
}) => API.post('products/filterTheProducts', param)

export const getCart = (userEmail: string) => API.get(`/order/getCart`, { params: { userEmail } });
export const getOrders = (userEmail: string) => API.get(`/order/getOrders`, { params: { userEmail } });

export const addProductToCart = (data: {
    userId: number,
    productName: string,
    productSize: string,
    productColor: string,
    productPricePerUnit: number
}) => API.post('/order/addProductToCart', data);

export const getQuantityOfProducts = (data: any) => API.post('products/getQuantityOfProducts', data);

export const updateCart = (data: {
    userId: number,
    productName: string,
    productColor: string,
    productSize: string,
    quantity: number
}) => API.post('/order/updateCart', data);

export const placeOrder = (data: {
    userId: number,
    addressId: number,
    totalAmount: number
}) => API.post('/order/placeOrder', data);


export const getProductsOnScreen = () => API.get('products/getProductsOnScreen');
export const setProductsOnScreen = (data: { productsOnScreen: ProductTypeModel[] }) => API.post('products/setProductsOnScreen', data);
export const updateProduct = (data: { name: string, color: string, size: string, quantity: number }) => API.post('products/updateProduct', data);