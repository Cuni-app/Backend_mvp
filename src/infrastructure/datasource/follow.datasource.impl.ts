import { CreateFollowDTO, FollowDatasource, FollowEntity, UserEntity } from "../../domain";

export class FollowDatadsourceImpl implements FollowDatasource{
    seguir(createFollowDTO: CreateFollowDTO): Promise<FollowEntity> {
        throw new Error("Method not implemented.");
    }
    dejarDeSeguir(idSeguido: number, idSeguidor: number): Promise<FollowEntity> {
        throw new Error("Method not implemented.");
    }
    getSeguidores(idSeguido: number): Promise<Partial<UserEntity>[]> {
        throw new Error("Method not implemented.");
    }
    getSeguidos(idSeguidor: number): Promise<Partial<UserEntity>[]> {
        throw new Error("Method not implemented.");
    }
    
}