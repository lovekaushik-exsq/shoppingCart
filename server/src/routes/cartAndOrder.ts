import express from "express";
import { getAddressOfUser, getCartForUser } from "../controllers/cartAndOrder";
const router = express.Router();

router.post('/getAllAddressOfUser', getAddressOfUser);
router.post('/getCart', getCartForUser);

module.exports = router;