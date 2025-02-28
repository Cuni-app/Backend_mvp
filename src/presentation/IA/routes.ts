import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth";
import { IAController } from "./controller";

export class IARoutes {
    static get routes(): Router{
            const router = Router();
            const controller = new IAController()
            router.get('/', [AuthMiddleware.validarToken], controller.respuestaIA)
            
    
            return router
        }
}