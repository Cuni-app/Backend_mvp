import { CreateItemDTO } from "../dtos";
import { ItemEntity } from "../entities";

export abstract class ItemDatasource {
    abstract create(createItemDTO: CreateItemDTO): Promise<ItemEntity>;
    abstract deleteByID(id: number): Promise<ItemEntity>;
    abstract getItemsByUser(email: string): Promise<ItemEntity[]>;
    abstract asignarItem(
        id: number,
        email: string
    ): Promise<{ name: string, email: string, item: ItemEntity }>;
}
