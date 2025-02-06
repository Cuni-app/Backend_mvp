import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

interface CambiarContraseniaUseCase{
    execute(email: string, newPassword: string): Promise<Partial<UserEntity>>
}

export class CambiarContrasenia implements CambiarContraseniaUseCase{
    constructor(
        private readonly repository: UserRepository
    ){}
    execute(email: string, newPassword: string): Promise<Partial<UserEntity>> {
        return this.repository.cambiarContrasenia(email, newPassword)
    }
}