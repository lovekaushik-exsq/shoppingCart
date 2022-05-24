import express, { Router } from "express";
import { getCartForUser, addProductToCart, updateCart, placeOrder, getAllOrdersForUser } from "../controllers/cartAndOrder";
const router: Router = express.Router();

router.get('/getCart', getCartForUser);
router.get('/getOrders', getAllOrdersForUser);
router.post('/addProductToCart', addProductToCart);
router.post('/updateCart', updateCart);
router.post('/placeOrder', placeOrder);

export default router;