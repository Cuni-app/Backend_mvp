import { CategoriaEntity, PreguntaEntity, RespuestaEntity } from "../../entities"
import { CategoriaRepository } from "../../repositories"

interface GetSimulacroUseCase{
    execute(id: number): Promise<{categoria: CategoriaEntity, preguntas: {pregunta: PreguntaEntity,respuestas: RespuestaEntity[]}[]}>
}

export class GetSimulacro implements GetSimulacroUseCase{
    constructor(
        private readonly repository: CategoriaRepository
    ){}
    execute(id: number): Promise<{categoria: CategoriaEntity, preguntas: {pregunta: PreguntaEntity,respuestas: RespuestaEntity[]}[]}> {
        return this.repository.getSimulacro(id)
    }
}