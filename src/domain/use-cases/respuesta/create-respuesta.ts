import { CreateRespuestaDTO } from "../../dtos";
import { RespuestaEntity } from "../../entities";
import { RespuestaRepository } from "../../repositories";

interface CreateRespuestaUseCase{
    execute(dto: CreateRespuestaDTO): Promise<RespuestaEntity>;
}

export class CreateRespuesta implements CreateRespuestaUseCase{
    constructor(
        private readonly repository: RespuestaRepository
    ){}
    execute(dto: CreateRespuestaDTO): Promise<RespuestaEntity> {
        return this.repository.create(dto)
    }
}