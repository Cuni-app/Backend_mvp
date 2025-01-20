import {config} from 'dotenv'
import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
config()

interface JwtPayload {
    user: {
        id: string;
        [key: string]: any;
    };
}

// export interface MyRequest extends Request {
//     user?: {
//         id:string;
//         [key: string]: any;
//     }
// }

export class authMiddleware{

    static async validarToken (req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization')
        
        if (!authorization) return res.status(401).json({error: 'Not token provided'});
        if (!authorization.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid Bearer token'});
        
        const jwtToken = authorization.split(' ')[1] || req.header("jwt_token");
        
        try {
            if (!jwtToken){
                return res.status(401).json("You are not authorized :(")
            }
    
            const payload = await JwtAdapter.validateToken<JwtPayload>(jwtToken);
            if (!payload) return res.status(401).json({error: 'Token invalido'})
            req.body.user = payload!.user;
    
            next()
    
        } catch (error) {
            console.log(error instanceof Error? error.message : error)
            return res.status(401).json("You are not authorized :(")
        }
    }
}

