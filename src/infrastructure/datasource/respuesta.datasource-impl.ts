import { prisma } from "../../data/postgres";
import { CreateRespuestaDTO, CustomError, PreguntaDatasource, RespuestaDatasource, RespuestaEntity, UpdateRespuestaDTO } from "../../domain";

export class RespuestaDatasourceImpl implements RespuestaDatasource{
    
    async create(createRespuestaDTO: CreateRespuestaDTO): Promise<RespuestaEntity> {
        const respuesta = await prisma.respuesta.create({
            data: {
                contenido: createRespuestaDTO.contenido,
                esCorrecto: createRespuestaDTO.esCorrecto,
                pregunta: {
                    connect: {
                        id: createRespuestaDTO.id_pregunta
                    }
                }
            }
        })

        return RespuestaEntity.fromObject(respuesta)
    }
    async updateById(updateRespuestaDTO: UpdateRespuestaDTO): Promise<RespuestaEntity> {
        await this.getById(+updateRespuestaDTO.id)
        const respuesta = await prisma.respuesta.update({
            where: {
                id: updateRespuestaDTO.id
            },
            data: updateRespuestaDTO
        })
        return RespuestaEntity.fromObject(respuesta)
    }

    async deleteById(id: number): Promise<RespuestaEntity> {
        await this.getById(id);
        const deleted = await prisma.respuesta.delete({
            where: {
                id
            }
        })
        return RespuestaEntity.fromObject(deleted)
    }
    
    async getById(id: number): Promise<RespuestaEntity>{
        const respuesta = await prisma.respuesta.findUnique({
            where: {
                id
            }
        })
        if (!respuesta) throw new CustomError(`No se encontro respuesta con id: ${id}`, 404);
        return RespuestaEntity.fromObject(respuesta)
    }
}