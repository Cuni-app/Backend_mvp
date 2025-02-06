import { CreateFollowDTO } from "../dtos";
import { UserEntity } from "../entities";
import { FollowEntity } from '../entities/follow.entity';

export abstract class FollowDatasource{
    abstract seguir(createFollowDTO: CreateFollowDTO): Promise<FollowEntity>;
    abstract dejarDeSeguir(idSeguido: number, idSeguidor: number): Promise<FollowEntity>;
    abstract getSeguidores(idSeguido: number): Promise<Partial<UserEntity>[]>
    abstract getSeguidos(idSeguidor: number): Promise<Partial<UserEntity>[]>
}