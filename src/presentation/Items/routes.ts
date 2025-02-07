import { Router } from 'express';
import { AuthMiddleware } from '../middleware/auth';
import { ItemDatasourceImpl, ItemRepositoryImpl, UserDatasourceImpl } from '../../infrastructure';
import { envs } from '../../config';
import { EmailService } from '../repository/email.service';
import { ItemController } from './controller';




export class ItemRoutes {


  static get routes(): Router {

    const router = Router();
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    )
    const userDatesource = new UserDatasourceImpl(emailService)
    const itemDatasource = new ItemDatasourceImpl(userDatesource)
    const itemRepository = new ItemRepositoryImpl(itemDatasource)
    const controller = new ItemController(itemRepository)
    // Definir las rutas
  
    router.get('/ItemsPorUsuario',[AuthMiddleware.validarToken], controller.getItemsPorUsuario);

    router.post('/', (req, res) => controller.crearItem(req, res))

    router.delete('/:id', (req, res) => controller.eliminarItemPorID(req, res))

    router.post('/asignarItem/:id',[AuthMiddleware.validarToken], controller.asignarItemUsuario)

    return router;
  }
}