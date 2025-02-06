import { UpdateRespuestaDTO } from "../../dtos";
import { RespuestaEntity } from "../../entities";
import { RespuestaRepository } from "../../repositories";

interface UpdateRespuestaByIdUseCase{
    execute(dto: UpdateRespuestaDTO): Promise<RespuestaEntity>;
}

export class UpdateRespuestaByID implements UpdateRespuestaByIdUseCase{
    constructor(
        private readonly repository: RespuestaRepository
    ){}
    execute(dto: UpdateRespuestaDTO): Promise<RespuestaEntity> {
        return this.repository.updateById(dto)
    }
}