import { CreateResultadoDTO } from '../dtos/resultado/create-resultado.dto';
import { ResultadoEntity } from '../entities';
export abstract class ResultadoDatasource{
    abstract create(createResultadoDTO:CreateResultadoDTO): Promise<ResultadoEntity>
    abstract getByuserId(UserId: number): Promise<ResultadoEntity[]>
}