import { CreateUserDTO, LoginUserDto, UserDatasource, UserEntity, UserRepository } from "../../domain";

export class UserRepositoryImpl implements UserRepository{
    constructor(
        private readonly dataSource: UserDatasource
    ){}
    getByEmail(email: string): Promise<UserEntity> {
        return this.dataSource.getByEmail(email);
    }
    registro(createUserDTO: CreateUserDTO): Promise<{ user: UserEntity; token: string; }> {
        return this.dataSource.registro(createUserDTO);
    }
    login(loginUserDto: LoginUserDto): Promise<{ user: Partial<UserEntity>; token: string; }> {
        return this.dataSource.login(loginUserDto);
    }
    validateEmail(token: string): Promise<boolean> {
        return this.dataSource.validateEmail(token)
    }
    enviarCodigo(email: string): Promise<boolean> {
        return this.dataSource.enviarCodigo(email)
    }
    validarCodigo(codigo: number): Promise<boolean> {
        return this.dataSource.validarCodigo(codigo)
    }
    cambiarContrasenia(email: string, newPassword: string): Promise<Partial<UserEntity>> {
        return this.dataSource.cambiarContrasenia(email, newPassword)
    }
}