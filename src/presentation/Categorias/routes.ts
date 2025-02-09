import { Router } from 'express';
import { CategoriaController } from './controller';
import { DIContainerRepository } from '../../infrastructure/DI/repositoryContainer';

export class CategoriaRoutes {

  static get routes(): Router {

    const router = Router();
    const repository = DIContainerRepository.getCategoriaRepository()
    const categoriaController = new CategoriaController(repository)
    // Definir las rutas
    router.get("/getAll", categoriaController.getAllCategorias)
    router.post("/create", categoriaController.crearCategoria );
    router.get("/nombre/:nombreCategoria", categoriaController.obtenerCategoriaPorNombre)
    router.get("/:id", categoriaController.obtenerCategoriaPorId)
    router.delete("/:id", categoriaController.deleteCategoriaById)
    router.put("/:id", categoriaController.updateCategoriabyId)

    router.get("/getPreguntas/:id", categoriaController.getPreguntasbyCategoria)
    router.get("/getSimulacro/:id", categoriaController.getSimulacro)
    return router;
  }


}