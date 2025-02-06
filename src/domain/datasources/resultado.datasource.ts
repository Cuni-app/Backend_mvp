import { CreateResultadoDTO } from '../dtos/resultado/create-resultado.dto';
import { ResultadoEntity } from '../entities';
export abstract class ResultadoDatasource{
    abstract create(createResultadoDTO:CreateResultadoDTO): Promise<ResultadoEntity>
    abstract getByUserId(UserId: number): Promise<ResultadoEntity[]>
}