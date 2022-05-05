import { NextFunction,Request,Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = async(req:Request,res:Response,next:NextFunction)=>{
    let tokenHeaderKey = 'my-secret-header-for-user-login';
    let jwtSecretKey = 'my-secret-token-of-user-login';
    try {
        const token:any = req.header(tokenHeaderKey);
        const verified = await jwt.verify(token, jwtSecretKey);
        if(verified){
            console.log("successfull verified",verified);
            return res.json({message:"Successfully Verified"});
        }else{
            console.log('invalid user')
            return res.status(401).json({message:"error"});
        }
    } catch (error) {
        return res.status(401).json({message:"error"});
    }

}