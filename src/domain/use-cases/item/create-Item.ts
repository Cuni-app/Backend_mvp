import { CreateItemDTO } from "../../dtos";
import { ItemEntity } from "../../entities";
import { ItemRepository } from "../../repositories/item.repository";

interface CreateItemUseCase{
    execute(dto: CreateItemDTO): Promise<ItemEntity>
}

export class CreateItem implements CreateItemUseCase{
    constructor(
        private readonly repository: ItemRepository
    ){}
    execute(dto: CreateItemDTO): Promise<ItemEntity> {
        return this.repository.create(dto)
    }
}
