// import axios from "axios";
const axios = require('axios');
const API = axios.create({ baseURL: "http://localhost:5000" });

export const test = () => API.get('/');
export const getAllProducts = () => API.get('/products/getAllProducts');