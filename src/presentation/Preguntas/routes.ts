import { Router } from 'express';
import { PreguntasController } from './controller';
import { PreguntaDatasourceImpl, PreguntaRepositoryImpl } from '../../infrastructure';




export class PreguntaRoutes {


  static get routes(): Router {

    const router = Router();
    const preguntaDatasource = new PreguntaDatasourceImpl()
    const preguntaRepository = new PreguntaRepositoryImpl(preguntaDatasource)
    const controller = new PreguntasController(preguntaRepository)
    
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );
    router.post("/", (req,res) => controller.crearPregunta(req,res))
    router.get("/:id", (req,res) => controller.obtenerPregunta(req,res))
    router.put("/:id", (req, res) => controller.editarPregunta(req,res))
    router.delete("/:id", (req,res) => controller.eliminarPregunta(req,res))

    return router;
  }


}