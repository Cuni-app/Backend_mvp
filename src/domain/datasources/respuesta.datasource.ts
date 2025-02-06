import { CreateRespuestaDTO, UpdateRespuetaDTO } from "../dtos";
import { RespuestaEntity } from "../entities";

export abstract class RespuestaDatasource{
    abstract create(createRespuestaDTO: CreateRespuestaDTO): Promise<RespuestaEntity>;
    abstract updateById(updateRespuestaDTO: UpdateRespuetaDTO): Promise<RespuestaEntity>;
    abstract deleteById(id: number): Promise<RespuestaEntity>;
    abstract getByIdPregunta(idPregunta: number): Promise<RespuestaEntity[]>
}