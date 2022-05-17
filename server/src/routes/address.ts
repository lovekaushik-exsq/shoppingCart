import express from "express";
import { getAllCountries, getStatesFor, getCitiesFor, getAllAddressOfUser, addNewAddress } from "../controllers/address";
const router = express.Router();

router.get('/getAllCountries', getAllCountries);
router.post('/getStatesFor', getStatesFor);
router.post('/getCitiesFor', getCitiesFor);
router.post('/getAllAddressOfUser', getAllAddressOfUser);
router.post('/addNewAddress', addNewAddress);

module.exports = router;