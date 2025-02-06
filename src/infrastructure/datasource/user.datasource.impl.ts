import { CreateUserDTO, LoginUserDto, UserDatasource, UserEntity } from "../../domain";

export class UserDatasourceImpl implements UserDatasource{
    getByEmail(email: string): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    registro(createUserDTO: CreateUserDTO): Promise<{ user: UserEntity; token: string; }> {
        throw new Error("Method not implemented.");
    }
    login(loginUserDto: LoginUserDto): Promise<{ user: Partial<UserEntity>; token: string; }> {
        throw new Error("Method not implemented.");
    }
    validateEmail(token: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    enviarCodigo(email: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    validarCodigo(codigo: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    cambiarContrasenia(email: string, newPassword: string): Promise<Partial<UserEntity>> {
        throw new Error("Method not implemented.");
    }

}