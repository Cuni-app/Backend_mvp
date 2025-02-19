import { CreateCategoriaDTO, UpdateCategoriaDTO } from "../dtos";
import { CategoriaEntity, PreguntaEntity, RespuestaEntity } from "../entities";

export abstract class CategoriaRepository {
    abstract create(
        createCategoriaDTO: CreateCategoriaDTO
    ): Promise<CategoriaEntity>;
    abstract getAll(): Promise<CategoriaEntity[]>;

    abstract findById(id: number): Promise<CategoriaEntity>;
    abstract findByName(name: string): Promise<{categoria: CategoriaEntity, preguntas: number[]}>;
    abstract updateById(
        updateCategoriaDTO: UpdateCategoriaDTO
    ): Promise<CategoriaEntity>;
    abstract deleteById(id: number): Promise<CategoriaEntity>
    abstract getAllPreguntas(id: number, cantidad?: number): Promise<{categoria: CategoriaEntity, preguntas: PreguntaEntity[]}>;
    abstract getSimulacro(id: number, cantidad?: number): Promise<CategoriaEntity>
}
