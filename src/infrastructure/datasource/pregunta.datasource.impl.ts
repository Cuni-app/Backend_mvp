import { prisma } from "../../data/postgres";
import { CreatePreguntaDTO, CustomError, PreguntaDatasource, PreguntaEntity, RespuestaEntity, UpdatePreguntaDTO } from "../../domain";

export class PreguntaDatasourceImpl implements PreguntaDatasource{
    
    async create(createPreguntaDTO: CreatePreguntaDTO): Promise<PreguntaEntity> {
        const pregunta = await prisma.pregunta.create({
            data: createPreguntaDTO
        })
        return PreguntaEntity.fromObject(pregunta)
    }
    
    async getById(id: number): Promise<PreguntaEntity> {
        const pregunta = await prisma.pregunta.findUnique({
            where: {
                id
            }
        })
        if (!pregunta) throw new CustomError( `Todo With ID ${id} not found`, 404);
        return PreguntaEntity.fromObject(pregunta)
    }
    
    async updateById(updatePreguntaDTO: UpdatePreguntaDTO): Promise<PreguntaEntity> {
        await this.getById(updatePreguntaDTO.id);
        const pregunta = await prisma.pregunta.update({
            where: {
                id: updatePreguntaDTO.id
            },
            data: updatePreguntaDTO
        })
        return PreguntaEntity.fromObject(pregunta)
    }
    
    async deleteById(id: number): Promise<PreguntaEntity> {
        await this.getById(id);
        const deleted = await prisma.pregunta.delete({
            where: {
                id
            }
        })
        
        return PreguntaEntity.fromObject(deleted)
    }
    
    async getRespuestasbyIdPregunta(id: number): Promise<{ pregunta: PreguntaEntity; respuestas: RespuestaEntity[]; }> {
        const pregunta = await this.getById(id)
        const respuestas = await prisma.respuesta.findMany({
            where:{
                id_pregunta: pregunta.id
            }
        })
        const shuffledRespuestas = respuestas.sort(() => Math.random() - 0.5);
        return {
            pregunta: PreguntaEntity.fromObject(pregunta),
            respuestas: shuffledRespuestas.map(x => RespuestaEntity.fromObject(x))
        }
    }
}