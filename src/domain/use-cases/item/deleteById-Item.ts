import { ItemEntity } from "../../entities";
import { ItemRepository } from "../../repositories/item.repository";

interface DeleteItemByIdUseCase{
    execute(id: number): Promise<ItemEntity>
}

export class DeleteItembyId implements DeleteItemByIdUseCase{
    constructor(
        private readonly repository: ItemRepository
    ){}
    execute(id: number): Promise<ItemEntity> {
        return this.repository.deleteByID(id)
    }
}