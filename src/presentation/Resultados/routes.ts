import { Router } from 'express';
import { ResultadosController } from './controller';
import { AuthMiddleware } from '../middleware/auth';
import { CategoriaDatasourceImpl, ResultadoDatasourceImpl, ResultadoRepositoryImpl, UserDatasourceImpl } from '../../infrastructure';
import { envs } from '../../config';
import { EmailService } from '../services/email.service';




export class ResultadoRoutes {


  static get routes(): Router {

    const router = Router();
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    )
    const categoriaDatasource = new CategoriaDatasourceImpl()
    const userDatasource = new UserDatasourceImpl(emailService)
    const resultadoDatasource = new ResultadoDatasourceImpl(userDatasource, categoriaDatasource)
    const resultadoRepository = new ResultadoRepositoryImpl(resultadoDatasource)
    const controller = new ResultadosController(resultadoRepository)

    router.get('/all', [AuthMiddleware.validarToken],controller.getAllResultados);
    router.post('/', [AuthMiddleware.validarToken], controller.postResultado);

    return router;
  }


}