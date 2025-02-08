import { regularExps } from "../../../config/regular-exp";

export class UpdateUserDTO {
    private constructor(
        public readonly nombre?: string,
        public readonly email?: string,
        public readonly validatedEmail?: boolean,
        public readonly premium?: boolean,
        public readonly nivel?: number,
        public readonly exp?: number,
        public readonly racha?: number,
        public readonly monedas?: number,
        public readonly password?: string,
    ) {}
    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.nombre !== undefined) returnObj.nombre = this.nombre;
        if (this.email !== undefined) returnObj.email = this.email;
        if (this.password !== undefined) returnObj.password = this.password;
        if (this.validatedEmail !== undefined)
            returnObj.validatedEmail = this.validatedEmail;
        if (this.premium !== undefined) returnObj.premium = this.premium;
        if (this.nivel !== undefined) returnObj.nivel = this.nivel;
        if (this.exp !== undefined) returnObj.exp = this.exp;
        if (this.racha !== undefined) returnObj.racha = this.racha;
        if (this.monedas !== undefined) returnObj.monedas = this.monedas;
        return returnObj;
    }
    static create(props: { [key: string]: any }): [string?, UpdateUserDTO?] {
        const {
            nombre,
            email,
            password,
            validatedEmail,
            premium,
            nivel,
            exp,
            racha,
            monedas,
        } = props;

        if (!email) return ['El email es obligatorio'];
        if(!regularExps.email.test(email)) return ['Email is not valid', undefined]
        
        if (password && password.length < 6)
            return ["La contraseña debe tener al menos 6 caracteres"];
        if (nivel && nivel < 0) return ["El nivel debe ser un número positivo"];
        if (exp && exp < 0)
            return ["La experiencia debe ser un número positivo"];
        if (racha && racha < 0) return ["La racha debe ser un número positivo"];
        if (monedas && monedas < 0)
            return ["Las monedas deben ser un número positivo"];

        return [
            undefined,
            new UpdateUserDTO(
                nombre,
                email,
                validatedEmail,
                premium,
                nivel,
                exp,
                racha,
                monedas,
                password
            ),
        ];
    }
}
