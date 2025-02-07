import { Router } from 'express';
import { CategoriaController } from './controller';
import { CategoriaDatasourceImpl, CategoriaRepositoryImpl } from '../../infrastructure';

export class CategoriaRoutes {

  static get routes(): Router {

    const router = Router();
    
    const dataSource = new CategoriaDatasourceImpl()
    const categoriaRepository = new CategoriaRepositoryImpl(dataSource)
    const categoriaController = new CategoriaController(categoriaRepository)
    // Definir las rutas
    router.get("/getAll", (req, res) => categoriaController.getAllCategorias(req,res))
    router.post("/create", (req, res) => categoriaController.crearCategoria(req, res) );
    router.get("/:nombreCategoria", (req,res) => categoriaController.obtenerCategoriaPorNombre(req,res))
    router.get("/:id", (req,res) => categoriaController.obtenerCategoriaPorId(req,res))
    router.delete("/:id", categoriaController.deleteCategoriaById)
    router.put("/:id", categoriaController.updateCategoriabyId)
    return router;
  }


}