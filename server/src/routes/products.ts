import express, { Router } from "express";
import { getAllProducts, getAllProductsBy, searchProductBy, getAllFilterOfProducts, filterTheProducts, getProductById, getQuantityOfProducts, getProductsOnScreen, setProductsOnScreen, updateProduct } from "../controllers/products";
const router: Router = express.Router();

router.get('/getAllProducts', getAllProducts);
router.post('/getProductById', getProductById);
router.post('/getAllProductsBy', getAllProductsBy);
router.post('/searchProductBy', searchProductBy);
router.get('/getAllFiltersOfProducts', getAllFilterOfProducts);
router.post('/filterTheProducts', filterTheProducts);
router.post('/getQuantityOfProducts', getQuantityOfProducts)
router.get('/getProductsOnScreen', getProductsOnScreen);
router.post('/setProductsOnScreen', setProductsOnScreen);
router.post('/updateProduct', updateProduct);

export default router;