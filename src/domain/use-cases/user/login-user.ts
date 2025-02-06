import { LoginUserDto } from "../../dtos";
import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

interface LoginUserUseCase{
    execute(dto: LoginUserDto): Promise<{user: Partial<UserEntity>, token: string}>
}

export class LoginUser implements LoginUserUseCase{
    constructor(
        private readonly repository: UserRepository
    ){}
    execute(dto: LoginUserDto): Promise<{ user: Partial<UserEntity>; token: string; }> {
        return this.repository.login(dto)
    }
}