import { prisma } from "../../data/postgres"

type preguntaCaracteristicas = {
    enunciado?: string,
    imagen_url?: string,
    solucion_url?: string
}

export class QuestionService{
    constructor(){}

    public async crearPregunta(categoria: string, enunciado: string, imagen_url: string, solucion_url: string) {
        const objCategoria = await prisma.categoria.findUnique({
            where:{
                nombre: categoria
            }
        })
        if (!objCategoria) throw new Error(`Categoria ${categoria} no encontrada`)
        
        const preguntaCreada = await prisma.pregunta.create({
            data: {
                enunciado,
                id_categoria: objCategoria.id,
                imagen_url,
                solucion_url
            }
        })
        return preguntaCreada
    }

    public async obtenerPregunta(idPregunta: number) {
        const pregunta = await prisma.pregunta.findUnique({
            where:{
                id:idPregunta
            }
        })
        const listaRespuestas = await prisma.respuesta.findMany({
            where:{
                id_pregunta:idPregunta
            }
        })
        return {
            enunciado: pregunta?.enunciado,
            imagen_url: pregunta?.imagen_url,
            solucion_url: pregunta?.solucion_url,
            respuestas: listaRespuestas
        }
    }

    public async editarPregunta(idPregunta: number, caracteristicas: preguntaCaracteristicas){
        const currentData = await prisma.pregunta.findUnique({
            where:{
                id:idPregunta
            }
        })
        if(!currentData) throw new Error(`Pregunta con id ${idPregunta} no encontrada`)
        const pregunta = await prisma.pregunta.update({
            where:{
                id:idPregunta
            },
            data:{
                enunciado: caracteristicas.enunciado?caracteristicas.enunciado:currentData?.enunciado,
                imagen_url: caracteristicas.imagen_url? caracteristicas.imagen_url:currentData?.imagen_url,
                solucion_url: caracteristicas.solucion_url? caracteristicas.solucion_url:currentData?.solucion_url
            }
        })

        return pregunta
    }

    public async eliminarPregunta(idPregunta: number) {
        const preguntaEliminada = await prisma.pregunta.delete({
            where:{
                id:idPregunta
            }
        })
        return preguntaEliminada
    }

}