import { CreateUserDTO, LoginUserDto } from "../dtos";
import { UserEntity } from "../entities";

export abstract class UserRepository{
    abstract getByEmail(email: string): Promise<UserEntity>
    abstract registro(createUserDTO: CreateUserDTO): Promise<{user: UserEntity, token: string}>
    abstract login(loginUserDto: LoginUserDto): Promise<{user: Partial<UserEntity>, token: string}>
    abstract validateEmail(token:string): Promise<boolean>;
    abstract enviarCodigo(email: string): Promise<boolean>;
    abstract validarCodigo(codigo: number): Promise<boolean>;
    abstract cambiarContrasenia(email: string, newPassword: string): Promise<Partial<UserEntity>>

}