import { Request} from "express";
import user from "../models/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const loginService = async(req:Request)=>{
        const {email,password} = req.body;
        const existingUser = await user.findOne({email:email})
        var message:string='';
        var status:number=0;
        if(existingUser){
            const isMatch = await bcrypt.compare(password,existingUser.password)
            if(!isMatch){
                message="Password or email do not match.\nPlease try again.";
                status = 401;
            }
            else{
                message="Login Successfully.";
                status = 201;
                let jwtSecretKey = process.env.JWT_SECRET_KEY||'my-secret-token-of-user-login';
                let jwtRefreshTokenKey = process.env.JWT_Refresh_Token_Key || 'my-secret-refresh-token-of-login'
                let data = {
                    email:email,
                }
               const accessToken =  jwt.sign(data, jwtSecretKey,{expiresIn:'10m'});
               const refreshToken = jwt.sign(data,jwtRefreshTokenKey,{expiresIn:'1d'});
               return {message,status,accessToken,refreshToken}
                //return {accessToken,refreshToken};
                // console.log(accessToken);
                // console.log(refreshToken);
               
            }
            
        }
        return {message,status}  
                 
}
