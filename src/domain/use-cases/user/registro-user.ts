import { CreateUserDTO } from "../../dtos";
import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

interface RegistroUsuarioUseCase{
    execute(dto: CreateUserDTO): Promise<{user: UserEntity, token: string}>
}

export class RegistroUsuario implements RegistroUsuarioUseCase{
    constructor(
        private readonly repository: UserRepository
    ){}

    execute(dto: CreateUserDTO): Promise<{ user: UserEntity; token: string; }> {
        return this.repository.registro(dto)
    }
}