import {Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config";
import { prisma } from "../../data/postgres";

export class AdminMiddleware {
    static async validarAdmin(req: Request, res: Response, next: NextFunction){
        req.body.rol = "ADMIN";
        next();
    }
}