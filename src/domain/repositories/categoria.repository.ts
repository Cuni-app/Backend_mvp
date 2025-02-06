import { CreateCategoriaDTO, UpdateCategoriaDTO } from "../dtos";
import { CategoriaEntity } from "../entities";

export abstract class CategoriaRepository {
    abstract create(
        createCategoriaDTO: CreateCategoriaDTO
    ): Promise<CategoriaEntity>;
    abstract getAll(): Promise<CategoriaEntity[]>;

    abstract findById(id: number): Promise<CategoriaEntity>;
    abstract findByName(name: string): Promise<CategoriaEntity>;
    abstract updateById(
        updateCategoriaDTO: UpdateCategoriaDTO
    ): Promise<CategoriaEntity>;
    abstract deleteById(id: number): Promise<CategoriaEntity>
}
