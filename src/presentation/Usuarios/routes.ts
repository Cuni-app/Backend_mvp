import { NextFunction, Response, Router } from 'express';
import { UserController } from './controller';
import {AuthMiddleware} from '../middleware/auth'
import { AuthService } from '../repository/auth.service';
import { EmailService } from '../repository/email.service';
import { envs } from '../../config/envs';


export class UserRoutes {


  static get routes(): Router {

    const router = Router();
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    )
    const authService = new AuthService(emailService)
    const userController = new UserController(authService)
    
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );

    router.post('/registro', (req,res) => userController.registrarUsuario(req,res))
    router.post('/login', (req,res) => userController.loginUsuario(req,res))

    router.get('/validate-email/:token', userController.validateEmail)


    return router;
  }


}