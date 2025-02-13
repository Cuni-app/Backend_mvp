import { Request, Response } from "express";
import { CategoriaRepository, CreateCategoria, CreateCategoriaDTO, CustomError, DeleteCategoriaById, FindCategoriaById, FindCategoriaByName, GetAllCategoria, GetAllPreguntasPorCategoria, GetSimulacro, UpdateCategoriaById, UpdateCategoriaDTO } from "../../domain";

export class CategoriaController {
    constructor(private readonly categoriaRepository: CategoriaRepository) {}
    private handleError = (res: Response, error: unknown) => {
        if (error instanceof CustomError){
            res.status(error.statusCode).json({error: error.message})
            return;
        }
        res.status(500).json({error: "Internal server error"})
    }

    public crearCategoria = (req: Request, res: Response) => {
        const [error, createCategoriaDto] = CreateCategoriaDTO.create(req.body);
        if (error) return res.status(400).json(error);

        new CreateCategoria(this.categoriaRepository)
            .execute(createCategoriaDto!)
            .then(cat => res.status(201).json(cat))
            .catch(error => this.handleError(res, error))
    };
    public getAllCategorias = (req: Request, res: Response) => {
        new GetAllCategoria(this.categoriaRepository)
            .execute()
            .then(cat => res.json(cat))
            .catch(error => this.handleError(res, error))
    };
    public obtenerCategoriaPorNombre = (req: Request, res: Response) => {
        const { nombreCategoria } = req.params;
        new FindCategoriaByName(this.categoriaRepository)
            .execute(nombreCategoria)
            .then(cat => res.json(cat))
            .catch(error => this.handleError(res, error))
    };
    public obtenerCategoriaPorId = (req: Request, res: Response) => {
        const { id } = req.params;
        new FindCategoriaById(this.categoriaRepository)
            .execute(Number(id))
            .then(cat => res.json(cat))
            .catch(error => this.handleError(res, error))
    };
    public deleteCategoriaById = (req: Request, res: Response) => {
        const { id } = req.params;
        new DeleteCategoriaById(this.categoriaRepository)
            .execute(Number(id))
            .then(cat => res.json(cat))
            .catch(error => this.handleError(res, error))
    }
    public updateCategoriabyId = (req: Request, res: Response) => {
        const id = +req.params.id; 
        const [error, updateCategoriaDto] = UpdateCategoriaDTO.create({
            ...req.body,
            id,
        });
        if (error) return res.status(400).json({ error });
        new UpdateCategoriaById(this.categoriaRepository)
            .execute(updateCategoriaDto!)
            .then(cat => res.json(cat))
            .catch(error => this.handleError(res, error))
    }
    public getPreguntasbyCategoria = (req: Request, res: Response) => {
        const id = +req.params.id;
        new GetAllPreguntasPorCategoria(this.categoriaRepository)
            .execute(id)
            .then(obj => res.json(obj))
            .catch(error => this.handleError(res, error))
    }
    public getSimulacro = (req: Request, res: Response) => {
        const id = +req.params.id;
        const cantidad = !!req.query.cantidad ? +req.query.cantidad : undefined;
        new GetSimulacro(this.categoriaRepository)
            .execute(id, cantidad)
            .then(obj => res.json(obj))
            .catch(error => this.handleError(res, error))
    }
}
