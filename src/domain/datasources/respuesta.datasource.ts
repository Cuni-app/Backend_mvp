import { CreateRespuestaDTO, UpdateRespuestaDTO } from "../dtos";
import { RespuestaEntity } from "../entities";

export abstract class RespuestaDatasource{
    abstract create(createRespuestaDTO: CreateRespuestaDTO): Promise<RespuestaEntity>;
    abstract updateById(updateRespuestaDTO: UpdateRespuestaDTO): Promise<RespuestaEntity>;
    abstract deleteById(id: number): Promise<RespuestaEntity>;
    abstract getById(id: number): Promise<RespuestaEntity>;
}