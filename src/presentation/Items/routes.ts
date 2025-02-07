import { Router } from 'express';
import { AuthMiddleware } from '../middleware/auth';
import { ItemDatasourceImpl, ItemRepositoryImpl, UserDatasourceImpl } from '../../infrastructure';
import { envs } from '../../config';
import { EmailService } from '../services/email.service';
import { ItemController } from './controller';
import { DIContainerRepository } from '../../infrastructure/DI/repositoryContainer';




export class ItemRoutes {


  static get routes(): Router {

    const router = Router();
    
    const repository = DIContainerRepository.getItemRepository()
    const controller = new ItemController(repository)
    // Definir las rutas
  
    router.get('/ItemsPorUsuario',[AuthMiddleware.validarToken], controller.getItemsPorUsuario);
    router.post('/', (req, res) => controller.crearItem(req, res))
    router.delete('/:id', (req, res) => controller.eliminarItemPorID(req, res))
    router.post('/asignarItem/:id',[AuthMiddleware.validarToken], controller.asignarItemUsuario)

    return router;
  }
}