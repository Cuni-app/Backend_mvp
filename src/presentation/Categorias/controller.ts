import { Request, Response } from "express";
import { CategoryService } from "../repository/category.service";

export class CategoriaController {
    constructor(
        private readonly categoryService: CategoryService
    ){}

    public crearCategoria = (req: Request, res: Response): void => {

        const {nombre, duracion} = req.body

        this.categoryService.registrarCategoria(nombre,duracion).then(data => res.json(data)).catch(error => res.json({error: error.message}))
    }
}