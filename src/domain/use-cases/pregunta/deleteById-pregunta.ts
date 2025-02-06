import { PreguntaEntity } from "../../entities";
import { PreguntaRepository } from "../../repositories";

interface DeletePreguntaByIdUseCase{
    execute(id: number): Promise<PreguntaEntity>
}

export class DeletePreguntaById implements DeletePreguntaByIdUseCase{
    constructor(
        private readonly repository: PreguntaRepository
    ){}
    execute(id: number): Promise<PreguntaEntity> {
        return this.repository.deleteById(id)
    }
}