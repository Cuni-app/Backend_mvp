import { Router } from 'express';
import { ItemController } from './controller';
import { ItemService } from '../repository/item.service';
import { AuthMiddleware } from '../middleware/auth';




export class ItemRoutes {


  static get routes(): Router {

    const router = Router();
    const itemService = new ItemService()
    const controller =  new ItemController(itemService)
    // Definir las rutas
  
    router.get('/ItemsPorUsuario',[AuthMiddleware.validarToken], controller.getItemsPorUsuario);

    router.post('/', (req, res) => controller.crearItem(req, res))

    router.delete('/:id', (req, res) => controller.eliminarItemPorID(req, res))

    router.post('/asignarItem/:id',[AuthMiddleware.validarToken], controller.asignarItemUsuario)

    return router;
  }
}