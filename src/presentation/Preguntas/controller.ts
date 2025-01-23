import { Request, Response } from "express";
import { QuestionService } from "../repository/question.service";


export class PreguntasController {
    constructor(
        public readonly questionService: QuestionService
    ) {}

    public crearPregunta = (req: Request, res: Response) => {
        const {categoria, enunciado, imagen_url, solucion_url} = req.body

        this.questionService.crearPregunta(categoria,enunciado,imagen_url,solucion_url).then(data => res.json(data)).catch(error => res.json({error: error.message}))

    }

    public obtenerPregunta = (req: Request, res: Response) => {

    }

    public eliminarPregunta = (req: Request, res: Response) => {

    }
}