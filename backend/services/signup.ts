import {Request} from "express";
import user from "../models/user";
import bcrypt from 'bcryptjs';
export const signService = async(req:Request)=>{
    const userExist = await user.findOne({email:req.body.email});
    let message:string;
    message = "User already registered.";
    let status:number=409;
    if(!userExist){
            const hashedValue = await bcrypt.hash(req.body.password,10)
                const newUser=new user({
                    name:req.body.name,
                    email:req.body.email,
                    address:req.body.address,
                    password:hashedValue
                });
                const newUserData =  await newUser.save();
                if(!newUserData){
                    message= "Internal server error";
                    status=500;
                }
                else{
                    message="Successfully Registered.";
                    status=201;
                }  
    }
    return {message,status};
}