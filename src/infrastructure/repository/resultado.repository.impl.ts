import { CreateResultadoDTO, ResultadoDatasource, ResultadoEntity, ResultadoRepository, UpdateUserDTO } from "../../domain";

export class ResultadoRepositoryImpl implements ResultadoRepository{
    constructor(
        private readonly dataSource: ResultadoDatasource
    ){}
    create(createResultadoDTO: CreateResultadoDTO, updateUserDTO: UpdateUserDTO): Promise<ResultadoEntity> {
        return this.dataSource.create(createResultadoDTO,updateUserDTO)
    }
    getByUserId(UserId: number): Promise<ResultadoEntity[]> {
        return this.dataSource.getByUserId(UserId)
    }
}