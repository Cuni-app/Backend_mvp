import {Router } from 'express';
import { EmailService } from '../services/email.service';
import { envs } from '../../config/envs';
import { UserController } from './controller';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../infrastructure';


export class UserRoutes {


  static get routes(): Router {

    const router = Router();
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    )
    
    const userDatasource = new UserDatasourceImpl(emailService)
    const userRepository = new UserRepositoryImpl(userDatasource)
    const userController = new UserController(userRepository)
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );

    router.post('/registro', userController.registrarUsuario)
    router.post('/login', userController.loginUsuario)
    router.get('/validate-email/:token', userController.validateEmail)

    router.get('/Codigo', userController.enviarCodigo)
    router.get('/enviarCodigo', userController.validarCodigo)
    router.post('/cambiarPassword', userController.cambiarContrasenia)


    // router.get('/obtenerPerfil/:id', userController.obtenerPerfil)

    
    return router;
  }


}