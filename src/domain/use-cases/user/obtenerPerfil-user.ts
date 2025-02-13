import { UserRepository } from "../../repositories";

interface ObtenerPerfilUseCase{
    execute(userID:number): Promise<any>
}

export class ObtenerPerfil implements ObtenerPerfilUseCase{
    constructor(
        private readonly repository: UserRepository
    ){}
    execute(userID: number): Promise<any> {
        return this.repository.obtenerPerfil(userID)
    }
}