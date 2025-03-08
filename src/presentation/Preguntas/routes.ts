import { Router } from 'express';
import { PreguntasController } from './controller';
import { DIContainerRepository } from '../../infrastructure/DI/repositoryContainer';
import { uploadFileMiddleware } from '../middleware/uploadFile';
import { AdminMiddleware } from '../middleware/adminMiddleware';
import { AuthMiddleware } from '../middleware/auth';




export class PreguntaRoutes {


  static get routes(): Router {
  const authMiddle = [
                AdminMiddleware.validarAdmin,
                AuthMiddleware.validarToken,
            ];
    const router = Router();
    
    const repository = DIContainerRepository.getPreguntaRepository() 
    const controller = new PreguntasController(repository)
    
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );
    router.post("/",  [...authMiddle,uploadFileMiddleware.subirImagen], controller.crearPregunta)
    router.get("/:id", controller.obtenerPregunta)
    router.get("/respuestas/:id", controller.getRespuestasByIdPregunta)
    router.put("/:id", authMiddle, controller.editarPregunta)
    router.delete("/:id", authMiddle, controller.eliminarPregunta)

    return router;
  }


}