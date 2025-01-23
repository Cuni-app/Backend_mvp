import { Router } from 'express';
import { PreguntasController } from './controller';
import { QuestionService } from '../repository/question.service';




export class PreguntaRoutes {


  static get routes(): Router {

    const router = Router();
    const questionService: QuestionService = new QuestionService()
    const controller = new PreguntasController(questionService)
    
    // Definir las rutas
    // router.use('/api/algo', /*TodoRoutes.routes */ );
    router.post("/", (req,res) => controller.crearPregunta(req,res))
    router.get("/:id", (req,res) => controller.obtenerPregunta(req,res))
    router.delete("/:id", (req,res) => controller.eliminarPregunta(req,res))

    return router;
  }


}