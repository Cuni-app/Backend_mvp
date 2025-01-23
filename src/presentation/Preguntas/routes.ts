import { Router } from 'express';
import { PreguntasController } from './controller';




export class PreguntaRoutes {


  static get routes(): Router {

    const router = Router();
    const controller = new PreguntasController()
    
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );
    router.post("/", (req,res) => controller.crearPregunta(req,res))
    router.get("/:id", (req,res) => controller.obtenerPregunta(req,res))
    router.delete("/:id", (req,res) => controller.eliminarPregunta(req,res))

    return router;
  }


}