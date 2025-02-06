import { PreguntaEntity } from "../../entities";
import { PreguntaRepository } from "../../repositories";

interface GetPreguntaByIdUseCase{
    execute(id: number): Promise<PreguntaEntity>
}

export class GetPreguntaById implements GetPreguntaByIdUseCase{
    constructor(
        private readonly repository: PreguntaRepository
    ){}

    execute(id: number): Promise<PreguntaEntity> {
        return this.repository.getById(id)
    }
}