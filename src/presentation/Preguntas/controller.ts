import { Request, Response } from "express";


export class PreguntasController {
    constructor() {}

    public crearPregunta = (req: Request, res: Response) => {
        const {categoria, enunciado, imagen_url, solucion_url} = req.body

    }

    public obtenerPregunta = (req: Request, res: Response) => {

    }

    public eliminarPregunta = (req: Request, res: Response) => {

    }
}