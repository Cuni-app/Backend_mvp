import { CreatePreguntaDTO, PreguntaDatasource, PreguntaEntity, UpdatePreguntaDTO } from "../../domain";

export class PreguntaDatasourceImpl implements PreguntaDatasource{
    create(createPreguntaDTO: CreatePreguntaDTO): Promise<PreguntaEntity> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<PreguntaEntity> {
        throw new Error("Method not implemented.");
    }
    updateById(updatePreguntaDTO: UpdatePreguntaDTO): Promise<PreguntaEntity> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<PreguntaEntity> {
        throw new Error("Method not implemented.");
    }
    
}