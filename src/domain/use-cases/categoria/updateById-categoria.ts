import { UpdateCategoriaDTO } from "../../dtos";
import { CategoriaEntity } from "../../entities";
import { CategoriaRepository } from "../../repositories/categoria.repository";

interface UpdateCategoriaByIdUseCase{
    execute(dto: UpdateCategoriaDTO): Promise<CategoriaEntity>;
}

export class UpdateCategoriaById implements UpdateCategoriaByIdUseCase{
    constructor(
        private readonly repository: CategoriaRepository
    ){}

    execute(dto: UpdateCategoriaDTO): Promise<CategoriaEntity> {
        return this.repository.updateById(dto)
    }

}