import { Router } from 'express';
import { ResultadosService } from '../repository/resultados.service';
import { ResultadosController } from './controller';
import { AuthMiddleware } from '../middleware/auth';




export class ResultadoRoutes {


  static get routes(): Router {

    const router = Router();
    const service = new ResultadosService()
    const controller = new ResultadosController(service)

    router.get('/todos', [AuthMiddleware.validarToken],controller.getAllResultados);
    router.post('/', [AuthMiddleware.validarToken], controller.postResultado)
    return router;
  }


}