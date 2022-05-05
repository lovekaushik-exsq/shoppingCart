import { Request,Response,NextFunction } from "express";
import { forgotService } from "../services/forgot";
export const forgot = async(req:Request,res:Response,next:NextFunction)=>{   
   const forgotData= await forgotService(req,res,next);   
   res.status(forgotData.status).json({message:forgotData.message,status:forgotData.status});           
 }