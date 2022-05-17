import express from "express";
import { getCartForUser, addProductToCart, updateCart, placeOrder } from "../controllers/cartAndOrder";
const router = express.Router();

// router.post('/getAllAddressOfUser', getAddressOfUser);
router.post('/getCart', getCartForUser);
router.post('/addProductToCart', addProductToCart);
router.post('/updateCart', updateCart);
router.post('/placeOrder', placeOrder);

module.exports = router;