import { CategoriaEntity, PreguntaEntity, RespuestaEntity } from "../../entities"
import { CategoriaRepository } from "../../repositories"

interface GetSimulacroUseCase{
    execute(id: number, cantidad?: number): Promise<CategoriaEntity>
}

export class GetSimulacro implements GetSimulacroUseCase{
    constructor(
        private readonly repository: CategoriaRepository
    ){}
    execute(id: number, cantidad?: number): Promise<CategoriaEntity> {
        return this.repository.getSimulacro(id, cantidad)
    }
}