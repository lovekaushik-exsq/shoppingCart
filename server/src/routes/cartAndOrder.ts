import express, { Router } from "express";
import { getCartForUser, addProductToCart, updateCart, placeOrder, getAllOrdersForUser } from "../controllers/cartAndOrder";
import auth from "../middleware/auth";
const router: Router = express.Router();

router.get('/getCart', auth, getCartForUser);
router.get('/getOrders', auth, getAllOrdersForUser);
router.post('/addProductToCart', auth, addProductToCart);
router.post('/updateCart', auth, updateCart);
router.post('/placeOrder', auth, placeOrder);

export default router;