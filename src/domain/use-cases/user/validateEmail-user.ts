import { UserRepository } from "../../repositories";

interface ValidateEmailUseCase{
    execute(token:string): Promise<boolean>;
}

export class ValidateEmail implements ValidateEmailUseCase{
    constructor(
        private readonly repository: UserRepository
    ){}
    execute(token: string): Promise<boolean> {
        return this.repository.validateEmail(token)
    }
}