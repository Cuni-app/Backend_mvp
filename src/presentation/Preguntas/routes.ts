import { Router } from 'express';
import { PreguntasController } from './controller';
import { DIContainerRepository } from '../../infrastructure/DI/repositoryContainer';
import { uploadFileMiddleware } from '../middleware/uploadFile';




export class PreguntaRoutes {


  static get routes(): Router {

    const router = Router();
    
    const repository = DIContainerRepository.getPreguntaRepository() 
    const controller = new PreguntasController(repository)
    
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );
    router.post("/", [uploadFileMiddleware.subirImagen], controller.crearPregunta)
    router.get("/:id", (req,res) => controller.obtenerPregunta(req,res))
    router.get("/respuestas/:id", (req,res) => controller.getRespuestasByIdPregunta(req,res))
    router.put("/:id", (req, res) => controller.editarPregunta(req,res))
    router.delete("/:id", (req,res) => controller.eliminarPregunta(req,res))

    return router;
  }


}