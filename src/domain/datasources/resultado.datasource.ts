import { CreateResultadoDTO } from '../dtos/resultado/create-resultado.dto';
import { ResultadoEntity } from '../entities';
export abstract class ResultadoDatasource{
    abstract create(createResultadoDTO:CreateResultadoDTO, monedas: number, experiencia: number): Promise<ResultadoEntity>
    abstract getByUserId(UserId: number): Promise<ResultadoEntity[]>
}