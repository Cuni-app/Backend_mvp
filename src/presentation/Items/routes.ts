import { Router } from 'express';
import { AuthMiddleware } from '../middleware/auth';
import { ItemController } from './controller';
import { DIContainerRepository } from '../../infrastructure/DI/repositoryContainer';
import { AdminMiddleware } from '../middleware/adminMiddleware';




export class ItemRoutes {


  static get routes(): Router {

    const authMiddle = [
                AdminMiddleware.validarAdmin,
                AuthMiddleware.validarToken,
            ];

    const router = Router();
    
    const repository = DIContainerRepository.getItemRepository()
    const controller = new ItemController(repository)
    // Definir las rutas
  
    router.get('/ItemsPorUsuario',[AuthMiddleware.validarToken], controller.getItemsPorUsuario);
    router.post('/', authMiddle, controller.crearItem)
    router.delete('/:id', authMiddle, controller.eliminarItemPorID)
    router.post('/asignarItem/:id',[AuthMiddleware.validarToken], controller.asignarItemUsuario)

    return router;
  }
}