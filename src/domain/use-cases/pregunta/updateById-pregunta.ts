import { UpdatePreguntaDTO } from "../../dtos";
import { PreguntaEntity } from "../../entities";
import { PreguntaRepository } from "../../repositories";

interface UpdatePreguntaByIdUseCase{
    execute(dto: UpdatePreguntaDTO): Promise<PreguntaEntity>
}

export class UpdatePreguntaById implements UpdatePreguntaByIdUseCase{
    constructor(
        private readonly repository: PreguntaRepository
    ){}

    execute(dto: UpdatePreguntaDTO): Promise<PreguntaEntity> {
        return this.repository.updateById(dto)
    }
}