import { CustomError } from "../errors";

export class UserEntity {
    
    constructor(
        public readonly id: number,
        public readonly nombre: string,
        public readonly email: string,
        public readonly validatedEmail: boolean = false,
        public readonly premium: boolean = false,
        public readonly nivel: number = 0,
        public readonly exp: number = 0,
        public readonly racha: number = 0,
        public readonly monedas: number = 0,
        public readonly password?: string,
    ) {}
    // get isValidated() {
    //     return !!this.validatedEmail;
    // }

    public static fromObject(object: { [key: string]: any }) {
        const {
            id,
            nombre,
            email,
            password,
            validatedEmail,
            premium,
            nivel,
            exp,
            racha,
            monedas,
        } = object;
        // Todo realizar validaciones de datos
        if (isNaN(Number(id)) || !id) throw new CustomError("Es requerido el id");
        if (!nombre) throw new CustomError("Es requerido el nombre");
        if (!email) throw new CustomError("Es requerido el email");
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            throw new CustomError("El email es requerido y debe tener un formato válido.");
        if (password && (typeof password !== "string" || password.length < 6)) 
            throw new CustomError("El password debe ser una cadena de texto de al menos 6 caracteres.");
        if (!validatedEmail && typeof validatedEmail !== "boolean")
            throw new CustomError("El campo validatedEmail debe ser un booleano.");
        if (!premium && typeof premium !== "boolean")
            throw new CustomError("El campo premium debe ser un booleano.");
        if (!nivel && (isNaN(Number(nivel)) || nivel < 0))
            throw new CustomError("El nivel debe ser un número válido y no negativo.");
        if (!exp && (isNaN(Number(exp)) || exp < 0))
            throw new CustomError("El campo exp debe ser un número válido y no negativo.");
        if (!racha && (isNaN(Number(racha)) || racha < 0))
            throw new CustomError("El campo racha debe ser un número válido y no negativo.");
        if (!monedas && (isNaN(Number(monedas)) || monedas < 0))
            throw new CustomError("El campo monedas debe ser un número válido y no negativo.");

        return new UserEntity(
            id,
            nombre,
            email,
            validatedEmail,
            premium,
            nivel,
            exp,
            racha,
            monedas
        );
    }
}
