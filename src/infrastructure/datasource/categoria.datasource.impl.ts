import { prisma } from "../../data/postgres";
import { CategoriaDatasource, CategoriaEntity, CreateCategoriaDTO, CustomError, PreguntaDatasource, PreguntaEntity, RespuestaEntity, UpdateCategoriaDTO } from "../../domain";

export class CategoriaDatasourceImpl implements CategoriaDatasource{
    constructor(
        private readonly preguntaDatasource: PreguntaDatasource
    ){}
    async create(createCategoriaDTO: CreateCategoriaDTO): Promise<CategoriaEntity> {
        const categoria = await prisma.categoria.create({
            data: createCategoriaDTO
        })
        return CategoriaEntity.fromObject(categoria)
    }
    async getAll(): Promise<CategoriaEntity[]> {
        const categorias = await prisma.categoria.findMany()
        return categorias.map(c => CategoriaEntity.fromObject(c))
    }
    async findById(id: number): Promise<CategoriaEntity> {
        const categoria = await prisma.categoria.findUnique({
            where: {
                id
            }
        })
        if (!categoria) throw new CustomError(`No se encontro categoria con ID: ${id}`, 404);
        return CategoriaEntity.fromObject(categoria)
    }
    async findByName(name: string): Promise<{categoria: CategoriaEntity, preguntas: number[]}> {
        const categoria = await prisma.categoria.findUnique({
            where: {
                nombre: name
            },
            include: {
                pregunta: true
            }
        })
        if (!categoria) throw new CustomError(`No se encontro categoria con Nombre: ${name}`, 404);
        return {categoria: CategoriaEntity.fromObject(categoria), preguntas: categoria.pregunta.map(p => p.id)}
    }
    async updateById(updateCategoriaDTO: UpdateCategoriaDTO): Promise<CategoriaEntity> {
        await this.findById(updateCategoriaDTO.id)
        const updateCat = await prisma.categoria.update({
            where: {
                id: updateCategoriaDTO.id
            },
            data: updateCategoriaDTO!.values
        })
        return CategoriaEntity.fromObject(updateCat)
    }
    async deleteById(id: number): Promise<CategoriaEntity> {
        await this.findById(id)
        const deleted = await prisma.categoria.delete({
            where: {
                id: id
            }
        })
        return CategoriaEntity.fromObject(deleted)
    }
    async getAllPreguntas(id: number, cantidad?: number): Promise<{ categoria: CategoriaEntity; preguntas: PreguntaEntity[]; }> {
        const categoria = await this.findById(id)
        const preguntas = await prisma.pregunta.findMany({
            where: {
                id_categoria: id
            }
        })
        const shuffledPreguntas = preguntas.sort(() => Math.random() - 0.5);

        return {
            categoria: categoria,
            preguntas: !!cantidad ? shuffledPreguntas.slice(0, cantidad) : shuffledPreguntas
        }
    }

    async getSimulacro(id: number, cantidad?: number): Promise<CategoriaEntity> {
        const {categoria, preguntas} = await this.getAllPreguntas(id, cantidad)
        const respuestas = await Promise.all(preguntas.map(p => this.preguntaDatasource.getRespuestasbyIdPregunta(p.id)))
        const simulacro = CategoriaEntity.fromObject({...categoria, preguntas: respuestas})
        return simulacro
    }
    
}