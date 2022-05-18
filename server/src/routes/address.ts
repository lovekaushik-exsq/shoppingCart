import express, { Router } from "express";
import { getAllCountries, getStatesFor, getCitiesFor, getAllAddressOfUser, addNewAddress } from "../controllers/address";
const router: Router = express.Router();

router.get('/getAllCountries', getAllCountries);
router.get('/getStatesFor', getStatesFor);
router.get('/getCitiesFor', getCitiesFor);
router.get('/getAllAddressOfUser', getAllAddressOfUser);
router.post('/addNewAddress', addNewAddress);

export default router;