import { Router } from "express"
import { AuthMiddleware } from "../middleware/auth";
import { FollowController } from "./controller";
import { DIContainerRepository } from "../../infrastructure/DI/repositoryContainer";

export class FollowRoutes{

    static get routes(): Router{
        const router = Router();
        const repository = DIContainerRepository.getFollowRepository()
        const controller = new FollowController(repository)
        router.post('/:id', [AuthMiddleware.validarToken], controller.seguir)
        router.get('/seguidores', [AuthMiddleware.validarToken], controller.getSeguidores)
        router.get('/seguidos', [AuthMiddleware.validarToken], controller.getSeguidos)
        router.delete('/:id', [AuthMiddleware.validarToken], controller.dejarDeSeguir)

        return router
    }

    
}