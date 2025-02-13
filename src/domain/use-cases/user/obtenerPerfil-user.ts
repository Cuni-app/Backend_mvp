import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

interface ObtenerPerfilUseCase{
    execute(userID:number):Promise<Partial<UserEntity> & { seguidores: number; seguidos: number }>
}

export class ObtenerPerfil implements ObtenerPerfilUseCase{
    constructor(
        private readonly repository: UserRepository
    ){}
    execute(userID: number): Promise<Partial<UserEntity> & { seguidores: number; seguidos: number }> {
        return this.repository.obtenerPerfil(userID)
    }
}