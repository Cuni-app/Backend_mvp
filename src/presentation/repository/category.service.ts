import { prisma } from "../../data/postgres";


export class CategoryService {
    constructor(){}

    public async registrarCategoria(nombre: string, duracion:number){
        const existingName = await prisma.categoria.findUnique({
            where:{
                nombre
            }
        })
        if(existingName) throw new Error("Ya existe una categoria "+ nombre);
        const createdCategory = await prisma.categoria.create({
            data:{
                nombre,
                duracion
            }
        })
        return{createdCategory}
    }

    public async obtenerCategorias(){
        const myCategories = await prisma.categoria.findMany()
        return { categorias: myCategories}
    }

    public async obtenerCategoria(nombreCategoria: string){
        const miCategoria = await prisma.categoria.findUnique({
            where:{
                nombre: nombreCategoria
            }
        })
        if (!miCategoria) throw new Error(`Categoria ${nombreCategoria} no encontrada`)
        const preguntas = await prisma.pregunta.findMany({
            where:{
                id_categoria: miCategoria?.id
            }
        })
        const idPreguntas = preguntas.map((pregunta) => pregunta.id)
        return {
            nombre: miCategoria?.nombre,
            duracion: miCategoria?.duracion,
            preguntas: idPreguntas
        }
    }
}