import { Router } from 'express';
import { UserRoutes } from './Usuarios/routes';
import { CategoriaRoutes } from './Categorias/routes';
import { PreguntaRoutes } from './Preguntas/routes';
import { ResultadoRoutes } from './Resultados/routes';
import { RespuestaRoutes } from './Respuestas/routes';
import { ItemRoutes } from './Items/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/user', UserRoutes.routes);
    router.use('/api/results', ResultadoRoutes.routes);
    router.use('/api/category', CategoriaRoutes.routes);
    router.use('/api/question', PreguntaRoutes.routes);
    router.use('/api/respuesta', RespuestaRoutes.routes);
    router.use('/api/items', ItemRoutes.routes);
    
    return router;
  }


}