import { CreateResultadoDTO, UpdateUserDTO } from '../../dtos';
import { ResultadoEntity } from '../../entities';
import { ResultadoRepository } from '../../repositories';

interface CreateResultadoUseCase{
    execute(dto:CreateResultadoDTO, updateUserDTO: UpdateUserDTO): Promise<ResultadoEntity>
}

export class CreateResultado implements CreateResultadoUseCase{
    constructor(
        private readonly repository: ResultadoRepository
    ){}
    execute(dto: CreateResultadoDTO, updateUserDTO: UpdateUserDTO): Promise<ResultadoEntity> {
        return this.repository.create(dto,updateUserDTO)
    }
}