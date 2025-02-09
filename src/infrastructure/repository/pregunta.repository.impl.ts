import { CreatePreguntaDTO, PreguntaDatasource, PreguntaEntity, PreguntaRepository, RespuestaEntity, UpdatePreguntaDTO } from "../../domain";

export class PreguntaRepositoryImpl implements PreguntaRepository{
    constructor(
        private readonly dataSource: PreguntaDatasource
    ){}
    getRespuestasbyIdPregunta(id: number): Promise<{ pregunta: PreguntaEntity; respuestas: RespuestaEntity[]; }> {
        return this.dataSource.getRespuestasbyIdPregunta(id)
    }
    create(createPreguntaDTO: CreatePreguntaDTO): Promise<PreguntaEntity> {
        return this.dataSource.create(createPreguntaDTO)
    }
    getById(id: number): Promise<PreguntaEntity> {
        return this.dataSource.getById(id)
    }
    updateById(updatePreguntaDTO: UpdatePreguntaDTO): Promise<PreguntaEntity> {
        return this.dataSource.updateById(updatePreguntaDTO)
    }
    deleteById(id: number): Promise<PreguntaEntity> {
        return this.dataSource.deleteById(id)
    }
    
}