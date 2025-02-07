import { Router } from 'express';
import { RespuestaController } from './controller';
import { PreguntaDatasourceImpl, RespuestaDatasourceImpl, RespuestaRepositoryImpl } from '../../infrastructure';




export class RespuestaRoutes {


  static get routes(): Router {
    const router = Router();

    const preguntadatasource = new PreguntaDatasourceImpl()
    const respuestaDatasource = new RespuestaDatasourceImpl(preguntadatasource)
    const respuestaRepository = new RespuestaRepositoryImpl(respuestaDatasource)
    const controller = new RespuestaController(respuestaRepository)
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );
    router.get("/pregunta/:id",  controller.getRespuestasByIdPregunta)
    router.post("/", controller.crearRespuesta)
    router.put("/:id", controller.actualizarRespuesta)
    router.delete("/:id", controller.eliminarRespuesta)
    return router;
  }


}