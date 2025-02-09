import { CreateRespuestaDTO, RespuestaDatasource, RespuestaEntity, RespuestaRepository, UpdateRespuestaDTO } from "../../domain";

export class RespuestaRepositoryImpl implements RespuestaRepository{
    constructor(
        private readonly dataSource: RespuestaDatasource
    ){}
    getById(id: number): Promise<RespuestaEntity> {
        return this.dataSource.getById(id)
    }
    create(createRespuestaDTO: CreateRespuestaDTO): Promise<RespuestaEntity> {
        return this.dataSource.create(createRespuestaDTO)
    }
    updateById(updateRespuestaDTO: UpdateRespuestaDTO): Promise<RespuestaEntity> {
        return this.dataSource.updateById(updateRespuestaDTO)
    }
    deleteById(id: number): Promise<RespuestaEntity> {
        return this.dataSource.deleteById(id)
    }
}