import {Router } from 'express';
import { UserController } from './controller';
import { DIContainerRepository } from '../../infrastructure/DI/repositoryContainer';
import { ChangePasswordMiddleware } from '../middleware/changePassword';


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
    router.post('/cambiarPassword', [ChangePasswordMiddleware.validarCodigo],userController.cambiarContrasenia)

    // router.get('/obtenerPerfil/:id', userController.obtenerPerfil)
    
    return router;
  }


}