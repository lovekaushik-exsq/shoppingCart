import express from "express";
import { getAllProducts, getAllProductsBy, searchProductBy, getAllFilterOfProducts, filterTheProducts, getProductById, getQuantityOfProducts, getProductsOnScreen, setProductsOnScreen } from "../controllers/products";
const router = express.Router();

router.get('/getAllProducts', getAllProducts);
router.post('/getProductById', getProductById);
router.post('/getAllProductsBy', getAllProductsBy);
router.post('/searchProductBy', searchProductBy);
router.get('/getAllFiltersOfProducts', getAllFilterOfProducts);
router.post('/filterTheProducts', filterTheProducts);
router.post('/getQuantityOfProducts', getQuantityOfProducts)
router.get('/getProductsOnScreen', getProductsOnScreen);
router.post('/setProductsOnScreen', setProductsOnScreen);

module.exports = router;