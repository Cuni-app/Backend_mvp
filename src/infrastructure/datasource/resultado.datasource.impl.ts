import { CreateResultadoDTO, ResultadoDatasource, ResultadoEntity } from "../../domain";

export class ResultadoDatasourceImpl implements ResultadoDatasource{
    create(createResultadoDTO: CreateResultadoDTO): Promise<ResultadoEntity> {
        throw new Error("Method not implemented.");
    }
    getByuserId(UserId: number): Promise<ResultadoEntity[]> {
        throw new Error("Method not implemented.");
    }
}