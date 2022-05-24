import express, { Router } from "express";
import { register, login, updateUserByEmail } from "../controllers/auth";
import { getUserByEmail } from "../controllers/auth";
const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getUserByEmail', getUserByEmail)
router.post('/updateUser', updateUserByEmail)

export default router;