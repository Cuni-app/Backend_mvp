import { CreateRespuestaDTO, RespuestaDatasource, RespuestaEntity, RespuestaRepository, UpdateRespuestaDTO } from "../../domain";

export class RespuestaRepositoryImpl implements RespuestaRepository{
    constructor(
        private readonly dataSource: RespuestaDatasource
    ){}
    create(createRespuestaDTO: CreateRespuestaDTO): Promise<RespuestaEntity> {
        return this.dataSource.create(createRespuestaDTO)
    }
    updateById(updateRespuestaDTO: UpdateRespuestaDTO): Promise<RespuestaEntity> {
        return this.dataSource.updateById(updateRespuestaDTO)
    }
    deleteById(id: number): Promise<RespuestaEntity> {
        return this.dataSource.deleteById(id)
    }
    getByIdPregunta(idPregunta: number): Promise<RespuestaEntity[]> {
        return this.dataSource.getByIdPregunta(idPregunta)
    }
}