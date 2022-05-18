import express, { Router } from "express";
import { getCartForUser, addProductToCart, updateCart, placeOrder } from "../controllers/cartAndOrder";
const router: Router = express.Router();

router.get('/getCart', getCartForUser);
router.post('/addProductToCart', addProductToCart);
router.post('/updateCart', updateCart);
router.post('/placeOrder', placeOrder);

export default router;