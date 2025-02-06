import { CreateResultadoDTO } from '../../dtos';
import { ResultadoEntity } from '../../entities';
import { ResultadoRepository } from '../../repositories';

interface CreateResultadoUseCase{
    execute(dto:CreateResultadoDTO): Promise<ResultadoEntity>
}

export class CreateResultado implements CreateResultadoUseCase{
    constructor(
        private readonly repository: ResultadoRepository
    ){}
    execute(dto: CreateResultadoDTO): Promise<ResultadoEntity> {
        return this.repository.create(dto)
    }
}