import { prisma } from "../../data/postgres";
import { CategoriaDatasource, CreateResultadoDTO, PreguntaDatasource, ResultadoDatasource, ResultadoEntity, UserDatasource } from "../../domain";

export class ResultadoDatasourceImpl implements ResultadoDatasource{
    
    constructor(
        private userDatasource: UserDatasource,
        private categoryDatasource: CategoriaDatasource
    ){}
    async create(createResultadoDTO: CreateResultadoDTO): Promise<ResultadoEntity> {
        
        await this.userDatasource.getById(createResultadoDTO.id_usuario)
        await this.categoryDatasource.findById(createResultadoDTO.id_categoria)

        const resultado = await prisma.resultado.create({
            data: {
                calificacion: createResultadoDTO.calificacion,
                cantidadCorrectas: createResultadoDTO.cantidadCorrectas,
                cantidadIncorrectas: createResultadoDTO.cantidadIncorrectas,
                tiempo: createResultadoDTO.tiempo,
                id_categoria: createResultadoDTO.id_categoria,
                id_usuario: createResultadoDTO.id_usuario
            }
        })
        return ResultadoEntity.fromObject(resultado)
    }
    async getByUserId(UserId: number): Promise<ResultadoEntity[]> {
        await this.userDatasource.getById(UserId) 
        const resultados = await prisma.resultado.findMany({
            where: {
                user: {
                    id: UserId
                }
            }
        })
        return resultados.map(r => ResultadoEntity.fromObject(r))
    }
}