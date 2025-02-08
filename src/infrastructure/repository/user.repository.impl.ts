import { CreateUserDTO, LoginUserDto, UpdateUserDTO, UserDatasource, UserEntity, UserRepository } from "../../domain";

export class UserRepositoryImpl implements UserRepository{
    constructor(
        private readonly dataSource: UserDatasource
    ){}
    getById(id: number): Promise<UserEntity> {
        return this.dataSource.getById(id)
    }
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
    validarCodigo(codigo: number): boolean {
        return this.dataSource.validarCodigo(codigo)
    }
    cambiarContrasenia(updateUserDto: UpdateUserDTO): Promise<Partial<UserEntity>> {
        return this.dataSource.cambiarContrasenia(updateUserDto)
    }
}