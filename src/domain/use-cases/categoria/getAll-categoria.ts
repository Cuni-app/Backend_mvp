import { CategoriaEntity } from "../../entities";
import { CategoriaRepository } from "../../repositories/categoria.repository";

interface GetAllCategoriasUseCase{
    execute(): Promise<CategoriaEntity[]>
}

export class GetAllCategoria implements GetAllCategoriasUseCase{
    constructor(
        private readonly repository: CategoriaRepository
    ){}
    execute(): Promise<CategoriaEntity[]> {
        return this.repository.getAll()
    }

}