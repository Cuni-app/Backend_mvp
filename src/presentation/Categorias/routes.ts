import { NextFunction, Request, Response, Router } from "express";
import { CategoriaController } from "./controller";
import { DIContainerRepository } from "../../infrastructure/DI/repositoryContainer";
import { AdminMiddleware } from "../middleware/adminMiddleware";
import { AuthMiddleware } from "../middleware/auth";

export class CategoriaRoutes {
    static get routes(): Router {
        const router = Router();
        const repository = DIContainerRepository.getCategoriaRepository();
        const categoriaController = new CategoriaController(repository);
        // Definir las rutas
        router.get("/getAll", categoriaController.getAllCategorias);

        // router.post("/create",[AdminMiddleware.validarAdmin], categoriaController.crearCategoria );
        router.post(
            "/create",
            [
                AdminMiddleware.validarAdmin,
                AuthMiddleware.validarToken,
            ],
            categoriaController.crearCategoria
        );

        router.get(
            "/nombre/:nombreCategoria",
            categoriaController.obtenerCategoriaPorNombre
        );
        router.get("/:id", categoriaController.obtenerCategoriaPorId);
        router.delete("/:id", categoriaController.deleteCategoriaById);
        router.put("/:id", categoriaController.updateCategoriabyId);

        router.get(
            "/getPreguntas/:id",
            categoriaController.getPreguntasbyCategoria
        );
        router.get("/getSimulacro/:id", categoriaController.getSimulacro);
        return router;
    }
}
