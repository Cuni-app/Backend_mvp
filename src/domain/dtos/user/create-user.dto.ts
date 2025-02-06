import { regularExps } from "../../../config/regular-exp";

export class CreateUserDTO{
    private constructor(
        public readonly nombre: string,
        public readonly email: string,
        public readonly password: string,
    ){}
    static create(props: {[key:string]: any}): [string?, CreateUserDTO?]{
        const {nombre, email, password} = props;
        if (!nombre) return ['Nombre es requerido', undefined]
        if (!email) return ['email es requerido', undefined]
        if(!regularExps.email.test(email)) return ['Email is not valid', undefined]
        if (!password) return ['password es requerido', undefined]
        if (password.length < 6) return ['password too short', undefined]
        return [undefined, new CreateUserDTO(nombre, email, password)]
    }
}