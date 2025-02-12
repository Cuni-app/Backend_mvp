import { prisma } from "../../data/postgres";
import { CategoriaDatasource, CreateResultadoDTO, PreguntaDatasource, ResultadoDatasource, ResultadoEntity, UpdateUserDTO, UserDatasource } from "../../domain";

export class ResultadoDatasourceImpl implements ResultadoDatasource{
    
    constructor(
        private userDatasource: UserDatasource,
        private categoryDatasource: CategoriaDatasource
    ){}
    async create(createResultadoDTO: CreateResultadoDTO, updateUserDTO: UpdateUserDTO): Promise<ResultadoEntity> {
        const datosUsuario = await this.userDatasource.getById(createResultadoDTO.id_usuario)
        await this.categoryDatasource.findById(createResultadoDTO.id_categoria)

        const resultado = await prisma.resultado.create({
            data: createResultadoDTO
        })

        if(!datosUsuario) throw new Error(`El usuario con id ${createResultadoDTO.id_usuario} no fe encontrado`)
        const recompensa = await prisma.user.update({
            where:{
                id:createResultadoDTO.id_usuario
            },
            data:{
                monedas: datosUsuario.monedas+updateUserDTO.monedas!,
                exp:datosUsuario.exp+updateUserDTO.exp!
            }
        })
        if (!recompensa) throw new Error("Error al añadir recompensa")
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