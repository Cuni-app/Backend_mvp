import { CreatePreguntaDTO, UpdatePreguntaDTO } from "../dtos";
import { PreguntaEntity } from "../entities";

export abstract class PreguntaRepository{
    abstract create(createPreguntaDTO: CreatePreguntaDTO): Promise<PreguntaEntity>
    abstract getById(id: number): Promise<PreguntaEntity>
    abstract updateById(updatePreguntaDTO: UpdatePreguntaDTO): Promise<PreguntaEntity>
    abstract deleteById(id: number): Promise<PreguntaEntity>
}