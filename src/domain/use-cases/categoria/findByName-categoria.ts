import { CategoriaEntity } from "../../entities";
import { CategoriaRepository } from "../../repositories/categoria.repository";

interface FindByNameUseCase{
    execute(name: string):Promise<CategoriaEntity>

}

export class FindCategoriaByName implements FindByNameUseCase{
    constructor(
        private readonly repository: CategoriaRepository
    ){}
    execute(name: string): Promise<CategoriaEntity> {
        return this.repository.findByName(name)
    }
}