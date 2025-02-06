import { ResultadoEntity } from '../../entities';
import { ResultadoRepository } from '../../repositories';

interface GetResultadoByUserIdUseCase{
    execute(UserId: number): Promise<ResultadoEntity[]>
}

export class GetResultadosByUser implements GetResultadoByUserIdUseCase{
    constructor(
        private readonly repository: ResultadoRepository
    ){}
    execute(UserId: number): Promise<ResultadoEntity[]> {
        return this.repository.getByuserId(UserId)
    }
}