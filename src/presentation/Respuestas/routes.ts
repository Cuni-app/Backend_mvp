import { Router } from 'express';
import { RespuestaController } from './controller';
import { AnswerService } from '../repository/answer.service';




export class RespuestaRoutes {


  static get routes(): Router {

    const controller = new RespuestaController(new AnswerService())

    const router = Router();
    
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );
    router.get("/pregunta/:id", (req,res) => controller.getRespuestasByIdPregunta(req,res))
    router.post("/",(req,res) => controller.crearRespuesta(req,res))
    router.put("/:id",(req,res) => controller.actualizarRespuesta(req,res))
    router.delete("/:id",(req,res) => controller.eliminarRespuesta(req,res))
    return router;
  }


}