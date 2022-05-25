import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
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
            populate(null, null, req);
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

const populate = (id: number | null, email: string | null, req: Request) => {
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
