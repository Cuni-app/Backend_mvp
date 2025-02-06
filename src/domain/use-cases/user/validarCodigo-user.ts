import { UserRepository } from "../../repositories";

interface ValidarCodigoUseCase{
    execute(codigo: number): Promise<boolean>;
}

export class ValidarCodigo implements ValidarCodigoUseCase{
    constructor(
        private readonly repository: UserRepository
    ){}
    execute(codigo: number): Promise<boolean> {
        return this.repository.validarCodigo(codigo)
    }
}

