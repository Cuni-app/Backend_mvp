import { UpdateUserDTO } from "../../dtos";
import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

interface CambiarContraseniaUseCase{
    execute(updateUserDto: UpdateUserDTO): Promise<Partial<UserEntity>>
}

export class CambiarContrasenia implements CambiarContraseniaUseCase{
    constructor(
        private readonly repository: UserRepository
    ){}
    execute(updateUserDto: UpdateUserDTO): Promise<Partial<UserEntity>> {
        return this.repository.cambiarContrasenia(updateUserDto)
    }
}