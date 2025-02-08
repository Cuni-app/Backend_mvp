import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

interface GetUserByEmailUseCase{
    execute(email: string): Promise<UserEntity>
}

export class GetUserByEmail implements GetUserByEmailUseCase{
    constructor(
        private readonly repository: UserRepository
    ){}
    execute(email: string): Promise<UserEntity> {
        return this.repository.getByEmail(email)
    }
}