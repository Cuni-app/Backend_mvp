import { UserEntity } from "../../entities";
import { FollowRepository } from "../../repositories/follow.repository";

interface GetSeguidoresUseCase{
    execute(idSeguido: number): Promise<Partial<UserEntity>[]>
}

export class GetSeguidores implements GetSeguidoresUseCase{
    constructor(
        private readonly repository: FollowRepository
    ){}
    execute(idSeguido: number): Promise<Partial<UserEntity>[]> {
        return this.repository.getSeguidores(idSeguido)
    }
}