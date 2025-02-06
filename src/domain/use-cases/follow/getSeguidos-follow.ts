import { UserEntity } from "../../entities";
import { FollowRepository } from "../../repositories/follow.repository";

interface GetSeguidosUseCase{
    execute(idSeguidor: number): Promise<Partial<UserEntity>[]>
}

export class GetSeguidos implements GetSeguidosUseCase{
    constructor(
        private readonly repository: FollowRepository
    ){}
    execute(idSeguidor: number): Promise<Partial<UserEntity>[]> {
        return this.repository.GetSeguidos(idSeguidor)
    }
}