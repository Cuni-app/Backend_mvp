import {Router } from 'express';
import { EmailService } from '../services/email.service';
import { envs } from '../../config/envs';
import { UserController } from './controller';
import { UserDatasourceImpl, UserRepositoryImpl } from '../../infrastructure';
import { DIContainerRepository } from '../../infrastructure/DI/repositoryContainer';


export class UserRoutes {


  static get routes(): Router {

    const router = Router();
    const repository = DIContainerRepository.getUserRepository()
    const userController = new UserController(repository)
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );

    router.post('/registro', userController.registrarUsuario)
    router.post('/login', userController.loginUsuario)
    router.get('/validate-email/:token', userController.validateEmail)

    router.get('/codigo', userController.enviarCodigo)
    router.get('/validarCodigo', userController.validarCodigo)
    router.post('/cambiarPassword', userController.cambiarContrasenia)


    // router.get('/obtenerPerfil/:id', userController.obtenerPerfil)

    
    return router;
  }


}