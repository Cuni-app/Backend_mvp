import { CategoriaEntity, PreguntaEntity } from "../../entities";
import { CategoriaRepository } from "../../repositories";

interface GetAllPreguntasPorCategoriaUseCase{
    execute(id: number, cantidad?: number): Promise<{categoria: CategoriaEntity, preguntas: PreguntaEntity[]}>;
}

export class GetAllPreguntasPorCategoria implements GetAllPreguntasPorCategoriaUseCase{
    constructor(private readonly repository: CategoriaRepository){}
    execute(id: number, cantidad?: number): Promise<{ categoria: CategoriaEntity; preguntas: PreguntaEntity[]; }> {
        return this.repository.getAllPreguntas(id)
    }
    
}