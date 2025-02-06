import { ItemEntity } from "../../entities";
import { ItemRepository } from "../../repositories/item.repository";

interface AsignarItemUseCase{
    execute(
            id: number,
            email: string
        ): Promise<{ name: string, email: string, item: ItemEntity }>
}

export class AsignarItem implements AsignarItemUseCase{
    constructor(
        private readonly repository: ItemRepository
    ){}
    execute(id: number, email: string): Promise<{ name: string; email: string; item: ItemEntity; }> {
        return this.repository.asignarItem(id, email)
    }
}