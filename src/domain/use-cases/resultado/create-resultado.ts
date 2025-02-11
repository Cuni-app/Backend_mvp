import { CreateResultadoDTO } from '../../dtos';
import { ResultadoEntity } from '../../entities';
import { ResultadoRepository } from '../../repositories';

interface CreateResultadoUseCase{
    execute(dto:CreateResultadoDTO, monedas: number, experiencia: number): Promise<ResultadoEntity>
}

export class CreateResultado implements CreateResultadoUseCase{
    constructor(
        private readonly repository: ResultadoRepository
    ){}
    execute(dto: CreateResultadoDTO, monedas: number, experiencia: number): Promise<ResultadoEntity> {
        return this.repository.create(dto,monedas,experiencia)
    }
}