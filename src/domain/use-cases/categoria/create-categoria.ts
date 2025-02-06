import { CreateCategoriaDTO } from "../../dtos";
import { CategoriaEntity } from "../../entities";
import { CategoriaRepository } from "../../repositories/categoria.repository";

export interface CreateCategoriaUseCase{
    execute(dto: CreateCategoriaDTO): Promise<CategoriaEntity>
}

export class createCategoria implements CreateCategoriaUseCase{
    constructor(
        private readonly repository: CategoriaRepository
    ){}
    execute(dto: CreateCategoriaDTO): Promise<CategoriaEntity> {
        return this.repository.create(dto)
    }
}


