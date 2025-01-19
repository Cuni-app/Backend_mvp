import jwt from "jsonwebtoken"
import {config} from 'dotenv'
import { Request, Response, NextFunction } from "express";
config()

interface JwtPayload {
    user: {
        id: string;
        [key: string]: any; // Permitir otras propiedades opcionales
    };
}

interface MyRequest extends Request {
    user?: {
        id:string;
        [key: string]: any;
    }
}

export default (req: MyRequest, res: Response, next: NextFunction) => {
    try {

        const jwtToken = req.header("jwt_token");

        if (!jwtToken){
            return res.status(401).send("You are not authorized :(")
        }

        if (!process.env.jwtSecret) {
            throw new Error("Missing jwtSecret in environment variables");
        }
        
        const payload = jwt.verify(jwtToken, process.env.jwtSecret) as JwtPayload;

        req.user = payload.user;

        next()

    } catch (error) {
        console.log(error instanceof Error? error.message : error)
        return res.status(401).send("You are not authorized :(")
    }
}