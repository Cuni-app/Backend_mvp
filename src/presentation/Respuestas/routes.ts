import { Router } from 'express';
import { RespuestaController } from './controller';
import { DIContainerRepository } from '../../infrastructure/DI/repositoryContainer';




export class RespuestaRoutes {


  static get routes(): Router {
    const router = Router();

    const repository = DIContainerRepository.getRespuestaRepository()
    const controller = new RespuestaController(repository)
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );
    router.post("/", controller.crearRespuesta)
    router.put("/:id", controller.actualizarRespuesta)
    router.delete("/:id", controller.eliminarRespuesta)
    return router;
  }
}