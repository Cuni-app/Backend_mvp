import {Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config";
import { prisma } from "../../data/postgres";

export class AdminMiddleware {
    static async validarAdmin(req: Request, res: Response, next: NextFunction){
        const authorization = req.header("Authorization");

        if (!authorization) return res.status(401).json({ error: 'Not token provided' });
        if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' });
        
        const jwtToken = authorization.split(' ').at(1) || req.header("jwt_token");
        if (!jwtToken) return res.status(401).json("You are not authorized :(");

        try {
            const payload = await JwtAdapter.validateToken<{ id: string }>(jwtToken);
            if (!payload) return res.status(401).json({ error: 'Token invalido' });

            const admin = await prisma.user.findUnique({
                where:{
                    id: +payload.id,
                    rol: "ADMIN"
                }
            })

            if(!admin) return res.status(401).json({ error: 'No eres admin.' });

            next();

        } catch (error) {
            console.log(error);
            return res.status(401).json({ error: "You are not authorized :(" });
        }
    }
}