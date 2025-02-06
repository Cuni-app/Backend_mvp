import { CreateFollowDTO } from "../dtos";
import { UserEntity } from "../entities";
import { FollowEntity } from '../entities/follow.entity';

export abstract class FollowRepository{
    abstract seguir(createFollowDTO: CreateFollowDTO): Promise<FollowEntity>;
    abstract dejarDeSeguir(idSeguido: number, idSeguidor: number): Promise<FollowEntity>;
    abstract GetSeguidores(idSeguido: number): Promise<Partial<UserEntity>[]>
    abstract GetSeguidos(idSeguidor: number): Promise<Partial<UserEntity>[]>
}