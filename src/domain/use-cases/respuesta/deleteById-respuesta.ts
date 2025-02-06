import { RespuestaEntity } from "../../entities";
import { RespuestaRepository } from "../../repositories";

interface DeleteRespuestaByIdUseCase{
    execute(id: number): Promise<RespuestaEntity>;
}

export class DeleteRespuestaById implements DeleteRespuestaByIdUseCase{
    constructor(
        private readonly repository: RespuestaRepository
    ){}
    execute(id: number): Promise<RespuestaEntity> {
        return this.repository.deleteById(id)
    }
}