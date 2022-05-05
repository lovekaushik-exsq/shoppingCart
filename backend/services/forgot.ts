import { NextFunction, Request,Response } from "express";
import user from "../models/user";
export const forgotService = async(req:Request,res:Response,next:NextFunction)=>{
        const {email} = req.body;
        var message:string;
        var status:number;
        const existingUser = await user.findOne({email:email})
        if(!existingUser){
          message="Please enter registered email";
          status=409;
        }else{
          message="Successful"
          status=201
        }
        return {message,status};
}