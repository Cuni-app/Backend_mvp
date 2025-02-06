import { CreateItemDTO } from "../dtos";
import { ItemEntity } from "../entities";
import { UserEntity } from "../entities/user.entity";

export abstract class ItemDatasource {
    abstract crearItem(createItemDTO: CreateItemDTO): Promise<ItemEntity>;
    abstract deleteItemByID(id: number): Promise<ItemEntity>;
    abstract getItemsByUser(email: string): Promise<ItemEntity[]>;
    abstract asignarItem(
        id: number,
        email: string
    ): Promise<{ name: string, email: string, item: ItemEntity }>;
}
