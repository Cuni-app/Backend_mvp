import { PreguntaEntity, RespuestaEntity } from "../../entities"
import { PreguntaRepository } from "../../repositories"

interface GetRespuestasbyIdPreguntaUseCase{
    execute(id: number): Promise<PreguntaEntity>
}

export class GetRespuestasByIdPreguna implements GetRespuestasbyIdPreguntaUseCase{
    constructor(
        private readonly repository: PreguntaRepository
    ){}
    execute(id: number): Promise<PreguntaEntity> {
        return this.repository.getRespuestasbyIdPregunta(id)
    }

}