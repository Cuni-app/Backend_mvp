import { prisma } from "../../data/postgres";
import { CreateItemDTO, ItemDatasource, ItemEntity, UserDatasource } from "../../domain";

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
        const items = await prisma.item.findMany({
            where: {
                usuarios: {
                    every: {
                        email
                    }
                }
            }
        })
        return items.map(i => ItemEntity.fromObject(i))
    }
    async asignarItem(id: number, email: string): Promise<{ name: string; email: string; item: ItemEntity; }> {
        const user = await this.userDatasource.getByEmail(email)
        const item = await prisma.item.update({
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
        return {email, name: user.nombre, item: ItemEntity.fromObject(item)}
    }
    
}