import { Router } from 'express';
import { ResultadosController } from './controller';
import { AuthMiddleware } from '../middleware/auth';
import { CategoriaDatasourceImpl, ResultadoDatasourceImpl, ResultadoRepositoryImpl, UserDatasourceImpl } from '../../infrastructure';
import { envs } from '../../config';
import { EmailService } from '../services/email.service';
import { DIContainerRepository } from '../../infrastructure/DI/repositoryContainer';




export class ResultadoRoutes {


  static get routes(): Router {

    const router = Router();
    const repository = DIContainerRepository.getResultadoRepository()
    const controller = new ResultadosController(repository)

    router.get('/all', [AuthMiddleware.validarToken],controller.getAllResultados);
    router.post('/', [AuthMiddleware.validarToken], controller.postResultado);

    return router;
  }


}