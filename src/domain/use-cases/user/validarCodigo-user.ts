import { UserRepository } from "../../repositories";

interface ValidarCodigoUseCase{
    execute(codigo: number): boolean;
}

export class ValidarCodigo implements ValidarCodigoUseCase{
    constructor(
        private readonly repository: UserRepository
    ){}
    execute(codigo: number): boolean {
        return this.repository.validarCodigo(codigo)
    }
}

