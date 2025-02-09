import { PreguntaEntity, RespuestaEntity } from "../../entities"
import { PreguntaRepository } from "../../repositories"

interface GetRespuestasbyIdPreguntaUseCase{
    execute(id: number): Promise<{pregunta: PreguntaEntity, respuestas: RespuestaEntity[]}>
}

export class GetRespuestasByIdPreguna implements GetRespuestasbyIdPreguntaUseCase{
    constructor(
        private readonly repository: PreguntaRepository
    ){}
    execute(id: number): Promise<{ pregunta: PreguntaEntity; respuestas: RespuestaEntity[] }> {
        return this.repository.getRespuestasbyIdPregunta(id)
    }

}