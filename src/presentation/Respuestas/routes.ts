import { Router } from 'express';
import { RespuestaController } from './controller';
import { DIContainerRepository } from '../../infrastructure/DI/repositoryContainer';
import { AdminMiddleware } from '../middleware/adminMiddleware';
import { AuthMiddleware } from '../middleware/auth';




export class RespuestaRoutes {


  static get routes(): Router {

    const authMiddle = [
                    AdminMiddleware.validarAdmin,
                    AuthMiddleware.validarToken,
                ];
    const router = Router();

    const repository = DIContainerRepository.getRespuestaRepository()
    const controller = new RespuestaController(repository)
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );
    router.post("/", authMiddle, controller.crearRespuesta)
    router.put("/:id", authMiddle, controller.actualizarRespuesta)
    router.delete("/:id", authMiddle, controller.eliminarRespuesta)
    return router;
  }
}