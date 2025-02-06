import { UserEntity } from "../entities";
import { CreateUserDTO } from '../dtos/user/create-user.dto';

export abstract class UserRepository{
    abstract getPerfilByEmail(email: string): Promise<UserEntity>
    abstract registro(createUserDTO: CreateUserDTO): Promise<{user: UserEntity, token: string}>
    abstract login(email: string, contrasenia: string): Promise<{user: Partial<UserEntity>, token: string}>
    abstract validateEmail(token:string): Promise<boolean>;
    abstract enviarCodigo(email: string): Promise<boolean>;
    abstract validarCodigo(codigo: number): Promise<boolean>;
    abstract cambiarContrasenia(email: string, newPassword: string): Promise<Partial<UserEntity>>

}