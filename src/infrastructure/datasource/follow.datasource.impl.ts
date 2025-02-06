import { prisma } from "../../data/postgres";
import { CreateFollowDTO, FollowDatasource, FollowEntity, UserDatasource, UserEntity } from "../../domain";

export class FollowDatadsourceImpl implements FollowDatasource{
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
        return FollowEntity.fromObject(follow)
    }
    async dejarDeSeguir(idSeguido: number, idSeguidor: number): Promise<FollowEntity> {
        const deleted = await prisma.follow.delete({
            where: {
                id_seguido_id_seguidor: {
                    id_seguido: idSeguido,
                    id_seguidor: idSeguidor
                }
            }
        })

        return FollowEntity.fromObject(deleted)
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
        const usersArr = users.map(u => {
            const {password, ...rest} = u
            return rest
        })
        return usersArr.map(u => UserEntity.fromObject(u))
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
        const usersArr = users.map(u => {
            const {password, ...rest} = u
            return rest
        })
        return usersArr.map(u => UserEntity.fromObject(u))
    }
    
}