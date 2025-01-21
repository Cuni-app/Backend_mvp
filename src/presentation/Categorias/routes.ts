import { Router } from 'express';
import { CategoriaController } from './controller';
import { CategoryService } from '../repository/category.service';

export class CategoriaRoutes {

  static get routes(): Router {

    const router = Router();
    const categoryService =  new CategoryService()
    const categoriaController = new CategoriaController(categoryService) 
    // Definir las rutas
    router.post("/create", (req, res) => categoriaController.crearCategoria(req, res) );
    return router;
  }


}