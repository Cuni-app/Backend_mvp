import { CreateFollowDTO, FollowDatasource, FollowEntity, FollowRepository, UserEntity } from "../../domain";

export class FollowRepositoryImpl implements FollowRepository{
    constructor(
        private readonly dataSource: FollowDatasource
    ){}
    seguir(createFollowDTO: CreateFollowDTO): Promise<FollowEntity> {
        return this.dataSource.seguir(createFollowDTO)
    }
    dejarDeSeguir(idSeguido: number, idSeguidor: number): Promise<FollowEntity> {
        return this.dataSource.dejarDeSeguir(idSeguido, idSeguidor)
    }
    getSeguidores(idSeguido: number): Promise<Partial<UserEntity>[]> {
        return this.dataSource.getSeguidores(idSeguido)
    }
    getSeguidos(idSeguidor: number): Promise<Partial<UserEntity>[]> {
        return this.dataSource.getSeguidos(idSeguidor)
    }
    
}