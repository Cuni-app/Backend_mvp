import { Router } from 'express';
import { UserRoutes } from './Usuarios/routes';
import { CategoriaRoutes } from './Categorias/routes';
import { PreguntaRoutes } from './Preguntas/routes';
import { ResultadoRoutes } from './Resultados/routes';
import { RespuestaRoutes } from './Respuestas/routes';
import { ItemRoutes } from './Items/routes';
import { FollowRoutes } from './Follows/routes';
import { IARoutes } from './IA/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    router.use('/api/user', UserRoutes.routes);
    router.use('/api/resultado', ResultadoRoutes.routes);
    router.use('/api/category', CategoriaRoutes.routes);
    router.use('/api/preguntas', PreguntaRoutes.routes);
    router.use('/api/respuestas', RespuestaRoutes.routes);
    router.use('/api/items', ItemRoutes.routes);
    router.use('/api/follow', FollowRoutes.routes);
    router.use('/api/ia', IARoutes.routes);
    
    return router;
  }


}