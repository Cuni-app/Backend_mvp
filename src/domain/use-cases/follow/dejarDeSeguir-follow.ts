import { FollowEntity } from "../../entities";
import { FollowRepository } from "../../repositories/follow.repository";

interface DejarDeSeguirUseCase{
    execute(idSeguido: number, idSeguidor: number): Promise<FollowEntity>
}

export class DejarDeSeguir implements DejarDeSeguirUseCase{
    constructor(
        private readonly repository: FollowRepository
    ){}
    execute(idSeguido: number, idSeguidor: number): Promise<FollowEntity> {
        return this.repository.dejarDeSeguir(idSeguido, idSeguidor)
    }
}