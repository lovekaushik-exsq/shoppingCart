import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import * as messages from "../constants/messages";
import dotenv from "dotenv";

dotenv.config();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization!.split(" ")[1];

        let decodedData: JwtPayload | string;

        if (token) {
            decodedData = jwt.verify(token, process.env.secret!);
            populate((<JwtPayload>decodedData)?.id, (<JwtPayload>decodedData)?.email, req);
        } else {
            return res.send(messages.notAuthenticated);
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

const populate = (id: number, email: string, req: Request) => {
    if (req.body.userId) {
        req.body.userId = id;
    }
    if (req.body.userEmail) {
        req.body.userEmail = email;
    }
    if (req.query.userEmail) {
        req.query.userEmail = email as string;
    }
}

export default auth;
