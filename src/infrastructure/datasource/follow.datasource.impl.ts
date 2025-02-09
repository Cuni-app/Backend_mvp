import { prisma } from "../../data/postgres";
import { CreateFollowDTO, FollowDatasource, FollowEntity, UserDatasource, UserEntity } from "../../domain";

export class FollowDatasourceImpl implements FollowDatasource{
    constructor(
        private readonly userDatasource: UserDatasource
    ){}
    async seguir(createFollowDTO: CreateFollowDTO): Promise<FollowEntity> {
        const follow = await prisma.follow.create({
            data: {
                id_seguido: createFollowDTO.idSeguido,
                id_seguidor: createFollowDTO.idSeguidor
            }
        })
        return FollowEntity.fromObject({
            id: follow.id, 
            idSeguidor: follow.id_seguidor, 
            idSeguido: follow.id_seguido
        })
    }
    async dejarDeSeguir(idSeguido: number, idSeguidor: number): Promise<FollowEntity> {
        const deleted = await prisma.follow.delete({
            where: {
                id_seguidor_id_seguido:{
                    id_seguidor: idSeguidor,
                    id_seguido: idSeguido
                }
            }
        })

        return FollowEntity.fromObject({
            id: deleted.id, 
            idSeguidor: deleted.id_seguidor, 
            idSeguido: deleted.id_seguido
        })
    }
    async getSeguidores(idSeguido: number): Promise<Partial<UserEntity>[]> {
        const seguidores = await prisma.follow.findMany({
            where: {
                id_seguido: idSeguido
            }
        })
        const users = await Promise.all(
            seguidores.map(f => this.userDatasource.getById(f.id_seguidor))
        )
        return users
                .map(u => UserEntity.fromObject(u))
                .map(x => {
                    return {
                        nombre: x.nombre,
                        nivel: x.nivel,
                        racha: x.racha
                    }
                })
    }
    async getSeguidos(idSeguidor: number): Promise<Partial<UserEntity>[]> {
        const seguidos = await prisma.follow.findMany({
            where: {
                id_seguidor: idSeguidor
            }
        })
        const users = await Promise.all(
            seguidos.map(f => this.userDatasource.getById(f.id_seguido))
        )
        return users
                .map(u => UserEntity.fromObject(u))
                .map(x => {
                    return {
                        nombre: x.nombre,
                        nivel: x.nivel,
                        racha: x.racha
                    }
                })
    }
    
}