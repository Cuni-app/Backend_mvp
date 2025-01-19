import { Router } from 'express';
import { UserController } from './controller';
import auth from '../../middleware/auth'


export class UserRoutes {


  static get routes(): Router {

    const router = Router();
    const userController = new UserController()
    
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );

    router.post('/registro', (req,res) => userController.registrarUsuario(req,res))

    router.post('/checkUser', auth as any, (req,res) => userController.confirmarToken(req,res))

    return router;
  }


}