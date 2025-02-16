import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

interface ObntenerRankingCase{
    execute(userID:number, page: number): Promise<Partial<UserEntity>[]>
}

export class ObtenerRanking implements ObntenerRankingCase{
    constructor(
        private readonly repository: UserRepository
    ){}
    execute(userID:number, page: number): Promise<Partial<UserEntity>[]> {
        return this.repository.obtenerRanking(userID,page)
    }
}