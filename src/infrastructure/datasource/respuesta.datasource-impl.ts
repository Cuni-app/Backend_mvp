import { CreateRespuestaDTO, RespuestaDatasource, RespuestaEntity, UpdateRespuestaDTO } from "../../domain";

export class RespuestaDatasourceImpl implements RespuestaDatasource{
    create(createRespuestaDTO: CreateRespuestaDTO): Promise<RespuestaEntity> {
        throw new Error("Method not implemented.");
    }
    updateById(updateRespuestaDTO: UpdateRespuestaDTO): Promise<RespuestaEntity> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<RespuestaEntity> {
        throw new Error("Method not implemented.");
    }
    getByIdPregunta(idPregunta: number): Promise<RespuestaEntity[]> {
        throw new Error("Method not implemented.");
    }
    
}