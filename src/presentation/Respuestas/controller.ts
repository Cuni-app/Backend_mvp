import { Request, Response } from "express";
import { CreateRespuestaDTO, CustomError, DeleteRespuestaById, GetRespuestasByIdPregunta, RespuestaRepository, UpdateRespuestaByID, UpdateRespuestaDTO } from "../../domain";
import { CreateRespuesta } from '../../domain/use-cases/respuesta/create-respuesta';

export class RespuestaController {
    constructor(private readonly respuestaRepository: RespuestaRepository) {}
    private handleError = (res: Response, error: unknown) => {
        if (error instanceof CustomError){
            res.status(error.statusCode).json({error: error.message})
            return;
        }
        res.status(500).json({error: "Internal server error"})
    }
    public getRespuestasByIdPregunta = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(+id)) return res.status(401).json("id is not a number");
        new GetRespuestasByIdPregunta(this.respuestaRepository)
            .execute(id)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    };

    public crearRespuesta = (req: Request, res: Response) => {
        const [error, createRespuestaDto] = CreateRespuestaDTO.create(req.body);
        if (error) return res.status(400).json(error);
        new CreateRespuesta(this.respuestaRepository)
            .execute(createRespuestaDto!)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    };

    public actualizarRespuesta = (req: Request, res: Response) => {
        const  id  = +req.params.id;
        if (isNaN(id)) return res.status(401).json("id is not a number");
        const [error, updateRespuestaDto] = UpdateRespuestaDTO.create({
            ...req.body,
            id
        });
        if (error) return res.status(400).json(error);

        new UpdateRespuestaByID(this.respuestaRepository)
            .execute(updateRespuestaDto!)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    };

    public eliminarRespuesta = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(401).json("id is not a number");
        new DeleteRespuestaById(this.respuestaRepository)
            .execute(id)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    };
}
