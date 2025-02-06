import { UserRepository } from "../../repositories";

interface EnviarCodigoUseCase{
    execute(email: string): Promise<boolean>;
}

export class EnviarCodigo implements EnviarCodigoUseCase{
    constructor(
        private readonly repository: UserRepository
    ){}
    execute(email: string): Promise<boolean> {
        return this.repository.enviarCodigo(email)
    }
}