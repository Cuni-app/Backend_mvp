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
}