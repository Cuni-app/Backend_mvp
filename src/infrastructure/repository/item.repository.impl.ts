import { CreateItemDTO, ItemDatasource, ItemEntity, ItemRepository } from "../../domain";

export class ItemRepositoryImpl implements ItemRepository{
    constructor(
        private readonly dataSource: ItemDatasource
    ){}
    create(createItemDTO: CreateItemDTO): Promise<ItemEntity> {
        return this.dataSource.create(createItemDTO)
    }
    deleteByID(id: number): Promise<ItemEntity> {
        return this.dataSource.deleteByID(id)
    }
    getItemsByUser(email: string): Promise<ItemEntity[]> {
        return this.dataSource.getItemsByUser(email)
    }
    asignarItem(id: number, email: string): Promise<{ name: string; email: string; item: ItemEntity; }> {
        return this.dataSource.asignarItem(id, email)
    }
}