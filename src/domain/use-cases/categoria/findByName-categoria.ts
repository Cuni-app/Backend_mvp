import { CategoriaEntity } from "../../entities";
import { CategoriaRepository } from "../../repositories/categoria.repository";

interface FindByNameUseCase{
    execute(name: string):Promise<{categoria: CategoriaEntity, preguntas: number[]}>

}

export class FindCategoriaByName implements FindByNameUseCase{
    constructor(
        private readonly repository: CategoriaRepository
    ){}
    execute(name: string): Promise<{categoria: CategoriaEntity, preguntas: number[]}> {
        return this.repository.findByName(name)
    }
}