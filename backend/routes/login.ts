import express from 'express';
import { userLogin,token } from '../controllers/login';
import {authenticateToken} from '../authenticateToken'
const router = express.Router();

router.post('/' ,userLogin);
router.post('/token',token);
router.use(authenticateToken);

module.exports=router;