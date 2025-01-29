import { Request, Response } from "express";
import { ResultadoObject, ResultadosService } from "../repository/resultados.service";



export class ResultadosController{
    constructor(
        private readonly resultadosService: ResultadosService
    ){}

    public getAllResultados = (req: Request, res: Response) => {
        const {id} = req.body.user
        this.resultadosService.getResultadosPorUserId(id)
            .then(data => res.status(201).json(data))
            .catch(error => res.status(500).json(error))
    }

    public postResultado  = (req: Request, res: Response) => {
        const {id} = req.body.user
        const body = req.body
        try {
            const resultadoObjeto: ResultadoObject = {
                id: body.resId,
                cantidadCorrectas: body.cantidadCorrectas,
                cantidadIncorrectas: body.cantidadIncorrectas,
                tiempo: body.tiempo,
                monedas: body.monedas,
                experiencia: body.experiencia
            }
            this.resultadosService.crearResultado(id, resultadoObjeto)
                .then(data => res.status(201).json(data))
                .catch(error => res.status(500).json(error))
            
        } catch (error) {
            res.status(400).json('Error en los datos de entrada')
        }

    }


}

