import { CategoriaEntity } from "../../entities";
import { CategoriaRepository } from "../../repositories/categoria.repository";

interface FindByIdUseCase{
    execute(id: number):Promise<CategoriaEntity>

}

export class FindCategoriaById implements FindByIdUseCase{
    constructor(
        private readonly repository: CategoriaRepository
    ){}
    execute(id: number): Promise<CategoriaEntity> {
        return this.repository.findById(id)
    }
}