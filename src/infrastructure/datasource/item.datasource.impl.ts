import { CreateItemDTO, ItemDatasource, ItemEntity } from "../../domain";

export class ItemDatasourceImpl implements ItemDatasource{
    create(createItemDTO: CreateItemDTO): Promise<ItemEntity> {
        throw new Error("Method not implemented.");
    }
    deleteByID(id: number): Promise<ItemEntity> {
        throw new Error("Method not implemented.");
    }
    getItemsByUser(email: string): Promise<ItemEntity[]> {
        throw new Error("Method not implemented.");
    }
    asignarItem(id: number, email: string): Promise<{ name: string; email: string; item: ItemEntity; }> {
        throw new Error("Method not implemented.");
    }
    
}