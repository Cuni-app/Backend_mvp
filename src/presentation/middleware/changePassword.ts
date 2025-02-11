import { Request, Response, NextFunction } from "express";
import { myCache } from "../../config";

export class ChangePasswordMiddleware {
    static async validarCodigo(req: Request, res: Response, next: NextFunction){
        const codigo = +req.body.codigo
        if (!codigo || isNaN(codigo)) return res.status(401).json({ error: "codigo no proporcionado" });

        try {
            const valor  = myCache.take(codigo)
            
            if (valor == undefined){
                return res.status(401).json({ error: "codigo no encontrado" });
            }
            const {email} = valor as any
            const nextReq = {
                email,
                password: req.body.password
            }
            req.body = nextReq
            console.log(req.body);
            next()
        } catch (error) {
            console.log(error);
            return res.status(401).json({ error: "codigo incorrecto" });
        }
    }
}
