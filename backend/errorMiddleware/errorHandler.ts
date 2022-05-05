import { NextFunction,Request,Response } from "express";
export class ErrorHandler{
    errorHandler(errMessage:string,req:Request,res:Response,next:NextFunction){
        const errorMessage:string = errMessage;
        res.json(errorMessage);
}
}