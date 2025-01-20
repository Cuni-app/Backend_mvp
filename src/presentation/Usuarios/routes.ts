import { Router } from 'express';
import { UserController } from './controller';
import auth from '../middleware/auth'
import { AuthService } from '../repository/auth.service';


export class UserRoutes {


  static get routes(): Router {

    const router = Router();
    const authService = new AuthService
    const userController = new UserController(authService)
    
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );

    router.post('/registro', (req,res) => userController.registrarUsuario(req,res))
    router.post('/login', (req,res) => userController.confirmarToken(req,res))

    router.get('/checkUser', auth as any, (req,res) => userController.confirmarToken(req,res))

    return router;
  }


}