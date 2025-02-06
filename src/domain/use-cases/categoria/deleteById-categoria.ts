import { CategoriaEntity } from "../../entities";
import { CategoriaRepository } from "../../repositories/categoria.repository";

interface DeleteCategoriaByIdUseCase{
    execute(id: number): Promise<CategoriaEntity>
}

export class DeleteCategoriaById implements DeleteCategoriaByIdUseCase{
    constructor(
        private readonly repository: CategoriaRepository
    ){}
    execute(id: number): Promise<CategoriaEntity> {
        return this.repository.deleteById(id)
    }
}