import { CategoriaDatasource, CategoriaEntity, CategoriaRepository, CreateCategoriaDTO, PreguntaEntity, RespuestaEntity, UpdateCategoriaDTO } from "../../domain";

export class CategoriaRepositoryImpl implements CategoriaRepository{

    constructor(
        private readonly dataSource: CategoriaDatasource
    ){}
    getSimulacro(id: number, cantidad?:number): Promise<{ categoria: CategoriaEntity; preguntas: { pregunta: PreguntaEntity; respuestas: RespuestaEntity[]; }[]; }> {
        return this.dataSource.getSimulacro(id, cantidad)
    }
    getAllPreguntas(id: number, cantidad?: number): Promise<{ categoria: CategoriaEntity; preguntas: PreguntaEntity[]; }> {
        return this.dataSource.getAllPreguntas(id)
    }

    create(createCategoriaDTO: CreateCategoriaDTO): Promise<CategoriaEntity> {
        return this.dataSource.create(createCategoriaDTO)
    }
    getAll(): Promise<CategoriaEntity[]> {
        return this.dataSource.getAll()
    }
    findById(id: number): Promise<CategoriaEntity> {
        return this.dataSource.findById(id)
    }
    findByName(name: string): Promise<{categoria: CategoriaEntity, preguntas: number[]}> {
        return this.dataSource.findByName(name)
    }
    updateById(updateCategoriaDTO: UpdateCategoriaDTO): Promise<CategoriaEntity> {
        return this.dataSource.updateById(updateCategoriaDTO)
    }
    deleteById(id: number): Promise<CategoriaEntity> {
        return this.dataSource.deleteById(id)
    }
    
}