import { prisma } from "../../data/postgres";
import { CreateItemDTO, CustomError, ItemDatasource, ItemEntity, UserDatasource, UserEntity } from "../../domain";

export class ItemDatasourceImpl implements ItemDatasource{
    constructor(
        private readonly userDatasource: UserDatasource
    ){}
    async create(createItemDTO: CreateItemDTO): Promise<ItemEntity> {
        const item = await prisma.item.create({
            data: {
                nombre: createItemDTO.nombre,
                precio: createItemDTO.precio
            }
        })
        return ItemEntity.fromObject(item)
    }
    async deleteByID(id: number): Promise<ItemEntity> {
        const deleted = await prisma.item.delete({
            where: {
                id
            }
        })
        return ItemEntity.fromObject(deleted)
    }
    async getItemsByUser(email: string): Promise<ItemEntity[]> {
        await this.userDatasource.getByEmail(email)
        const items = await prisma.item.findMany({
            where: {
                usuarios: {
                    some:{
                        email: email
                    }
                }
            }
        })
        return items.map(i => ItemEntity.fromObject(i))
    }
    async asignarItem(id: number, email: string): Promise<{ name: string; email: string; item: ItemEntity; }> {
        const user : UserEntity = await this.userDatasource.getByEmail(email)
        const item = await prisma.item.findUnique({where:{id}})
        if (!item) throw new CustomError('Item not founded :(',401)
        if(user.monedas<item?.precio){
            throw new CustomError("You don't have enough money!")
        }
        const itemRes = await prisma.item.update({
            where: {
                id
            },
            data: {
                usuarios: {
                    connect: {
                        email
                    }
                }
            }
        })
        const transaction = await prisma.user.update({
            where:{
                email
            },
            data:{
                monedas:user.monedas-item.precio
            }
        })
        return {email, name: user.nombre, item: ItemEntity.fromObject(itemRes)}
    }
    
}