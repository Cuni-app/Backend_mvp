import { ItemEntity } from "../../entities";
import { ItemRepository } from "../../repositories/item.repository";

interface GetItemsByUserUseCase{
    execute(email: string): Promise<ItemEntity[]>
}
export class GetItemsByUser implements GetItemsByUserUseCase{
    constructor(
        private readonly repository: ItemRepository
    ){}
    execute(email: string): Promise<ItemEntity[]> {
        return this.repository.getItemsByUser(email)
    }
}



