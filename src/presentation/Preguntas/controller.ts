import { Request, Response } from "express";
import { CreatePregunta, CreatePreguntaDTO, CustomError, DeletePreguntaById, GetPreguntaById, PreguntaRepository, UpdatePreguntaById, UpdatePreguntaDTO } from "../../domain";

type preguntaCaracteristicas = {
    enunciado?: string,
    imagen_url?: string,
    solucion_url?: string
}

export class PreguntasController {
    constructor(
        public readonly preguntaRepository: PreguntaRepository
    ) {}
    private handleError = (res: Response, error: unknown) => {
        if (error instanceof CustomError){
            res.status(error.statusCode).json({error: error.message})
            return;
        }
        res.status(500).json({error: "Internal server error"})
    }
    public crearPregunta = (req: Request, res: Response) => {
        const [error, createPreguntaDto] = CreatePreguntaDTO.create(req.body)
        if (error) return res.status(400).json(error);
        new CreatePregunta(this.preguntaRepository)
            .execute(createPreguntaDto!)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    }

    public obtenerPregunta = (req: Request, res: Response) => {
        const {id} = req.params
        if(isNaN(+id)) return res.status(401).json("id is not a number")
        new GetPreguntaById(this.preguntaRepository)
            .execute(+id)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    }

    public editarPregunta = (req: Request, res: Response) => {
        const id = +req.params.id
        const [error, updatePreguntaDto] = UpdatePreguntaDTO.create({
            ...req.body,
            id
        })
        if (error) return res.status(400).json({ error });
        new UpdatePreguntaById(this.preguntaRepository)
            .execute(updatePreguntaDto!)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    }

    public eliminarPregunta = (req: Request, res: Response) => {
        const id = +req.params.id
        if(isNaN(+id)) return res.status(401).json("id is not a number")
        new DeletePreguntaById(this.preguntaRepository)
            .execute(id)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    }
}