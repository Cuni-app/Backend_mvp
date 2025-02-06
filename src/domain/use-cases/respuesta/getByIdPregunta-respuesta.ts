import { RespuestaEntity } from "../../entities";
import { RespuestaRepository } from "../../repositories";

interface GetRepuestasByIdPreguntaUseCase{
    execute(idPregunta: number): Promise<RespuestaEntity[]>
}

export class GetRespuestasByIdPregunta implements GetRepuestasByIdPreguntaUseCase{
    constructor(
        private readonly repository: RespuestaRepository
    ){}

    execute(idPregunta: number): Promise<RespuestaEntity[]> {
        return this.repository.getByIdPregunta(idPregunta)
    }
}