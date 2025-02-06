import { CreateFollowDTO } from "../../dtos";
import { FollowEntity } from "../../entities";
import { FollowRepository } from "../../repositories/follow.repository";

interface SeguirFollowUseCase{
    execute(dto: CreateFollowDTO): Promise<FollowEntity>
}

export class SeguirFollow implements SeguirFollowUseCase{
    constructor(
        private readonly repository: FollowRepository
    ){}
    execute(dto: CreateFollowDTO): Promise<FollowEntity> {
        return this.repository.seguir(dto)
    }
}