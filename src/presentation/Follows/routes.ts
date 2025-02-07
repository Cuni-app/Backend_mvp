import { Router } from "express"
import { AuthMiddleware } from "../middleware/auth";
import { FollowDatasourceImpl, FollowRepositoryImpl, UserDatasourceImpl } from "../../infrastructure";
import { envs } from "../../config";
import { EmailService } from '../services/email.service';
import { FollowController } from "./controller";

export class FollowRoutes{

    static get routes(): Router{
        const router = Router();
        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        )
        const userDatesource = new UserDatasourceImpl(emailService)
        const followDatasource = new FollowDatasourceImpl(userDatesource)
        const followRepository = new FollowRepositoryImpl(followDatasource)
        const controller = new FollowController(followRepository)
        router.post('/:id', [AuthMiddleware.validarToken], controller.seguir)
        router.get('/seguidores', [AuthMiddleware.validarToken], controller.getSeguidores)
        router.get('/seguidos', [AuthMiddleware.validarToken], controller.getSeguidos)
        router.delete('/:id', [AuthMiddleware.validarToken], controller.dejarDeSeguir)

        return router
    }

    
}