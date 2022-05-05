import { Request,Response } from "express";
import { loginService } from "../services/login";
import jwt from 'jsonwebtoken';
const tokenList = {};
export const userLogin = async(req:Request,res:Response)=>{
   const userLoginData = await  loginService(req);
   res.status(userLoginData.status).json({message:userLoginData.message});
}

export const token = (req:Request,res:Response)=>{
   const postData = req.body
    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const user = {
            "email": postData.email
        }
        const token = jwt.sign(user,process.env.JWT_SECRET_KEY||'my-secret-token-of-user-login', { expiresIn: '10m'})
        const response = {
            "token": token,
        }
        tokenList[postData.refreshToken].token = token
        res.status(200).json(response);        
    } else {
        res.status(404).send('Invalid request')
}



}