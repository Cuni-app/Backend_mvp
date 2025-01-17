import { Router } from 'express';
import { CategoriaController } from './controller';




export class CategoriaRoutes {


  static get routes(): Router {

    const router = Router();
    const categoriaController = new CategoriaController() 
    // Definir las rutas
    router.get("/", (req, res) => categoriaController.getHolaMundo(req, res) );
    return router;
  }


}