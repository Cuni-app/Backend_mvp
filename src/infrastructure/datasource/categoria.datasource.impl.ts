import { CategoriaDatasource, CategoriaEntity, CreateCategoriaDTO, UpdateCategoriaDTO } from "../../domain";

export class CategoriaDatasourceImpl implements CategoriaDatasource{
    create(createCategoriaDTO: CreateCategoriaDTO): Promise<CategoriaEntity> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<CategoriaEntity[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<CategoriaEntity> {
        throw new Error("Method not implemented.");
    }
    findByName(name: string): Promise<CategoriaEntity> {
        throw new Error("Method not implemented.");
    }
    updateById(updateCategoriaDTO: UpdateCategoriaDTO): Promise<CategoriaEntity> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<CategoriaEntity> {
        throw new Error("Method not implemented.");
    }
    
}