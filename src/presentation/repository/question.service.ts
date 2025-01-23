import { prisma } from "../../data/postgres"


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