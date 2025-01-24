import { prisma } from "../../data/postgres";

export class AnswerService{
    constructor(){}

    public async crearRespuesta(idPregunta: number, contenido: string, esCorrecto: boolean){
        const objPregunta = await prisma.pregunta.findUnique({
            where:{
                id:idPregunta
            }
        })
        if (!objPregunta) throw new Error(`Pregunta con id ${idPregunta} no encontrada`)
        const respuestaCreada = await prisma.respuesta.create({
            data:{
                id_pregunta:idPregunta,
                contenido,
                esCorrecto
            }
        })
        return respuestaCreada
    }

    public async actualizarRespuesta(idRespuesta: number, contenido: string, correcto: boolean){

    }

    public async eliminarRespuesta(idRespuesta: number){
        
    }
}