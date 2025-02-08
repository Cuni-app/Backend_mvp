import { CreatePreguntaDTO } from "../../dtos";
import { PreguntaEntity } from "../../entities";
import { PreguntaRepository } from "../../repositories";

interface CreatePreguntaUseCase{
    execute(dto: CreatePreguntaDTO): Promise<PreguntaEntity>
}

export class CreatePregunta implements CreatePreguntaUseCase{
    constructor(
        private readonly repository: PreguntaRepository
    ){}

    execute(dto: CreatePreguntaDTO): Promise<PreguntaEntity> {
        return this.repository.create(dto)
    }
}