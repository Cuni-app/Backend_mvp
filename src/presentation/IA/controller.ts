import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { GenerarRespuesta } from "../../domain/use-cases/IA/generarRespuesta-usecase";

export class IAController {
    private handleError = (res: Response, error: unknown) => {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: error });
    };

    public respuestaIA = (req: Request, res: Response) => {
        const {solicitud} = req.body
        new GenerarRespuesta().execute(solicitud)
            .then(r => res.status(200).json(r))
            .catch(error => this.handleError(res, error))
    }
}
