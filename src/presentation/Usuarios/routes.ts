import {Router } from 'express';
import { UserController } from './controller';
import {AuthMiddleware} from '../middleware/auth'
import { AuthService } from '../repository/auth.service';
import { EmailService } from '../repository/email.service';
import { envs } from '../../config/envs';
import { UserService } from '../repository/user.service';
import { AuthController } from './Auth/controller';


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
    const userService = new UserService()
    const userController = new UserController(userService)
    const authController = new AuthController(authService)
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );

    router.post('/registro', (req,res) => authController.registrarUsuario(req,res))
    router.post('/login', (req,res) => authController.loginUsuario(req,res))

    router.get('/Codigo', authController.enviarCodigo)
    router.get('/enviarCodigo', authController.recibirCodigo)
    router.post('/cambiarPassword', authController.cambiarContrasenia)

    router.get('/validate-email/:token', authController.validateEmail)

    router.get('/obtenerPerfil/:id',[AuthMiddleware.validarToken], userController.obtenerPerfil)

    router.post('/seguir/:id', [AuthMiddleware.validarToken], userController.seguir)
    router.get('/seguidores', [AuthMiddleware.validarToken], userController.getSeguidores)
    router.get('/seguidos', [AuthMiddleware.validarToken], userController.getSeguidos)
    router.delete('/noSeguir/:id', [AuthMiddleware.validarToken], userController.dejarDeSeguir)
    return router;
  }


}