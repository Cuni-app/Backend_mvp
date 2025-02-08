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
        if (isNaN(Number(id)) || !id) throw "Es requerido el id";
        if (!nombre) throw "Es requerido el nombre";
        if (!email) throw "Es requerido el email";
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            throw "El email es requerido y debe tener un formato válido.";
        if (password && (typeof password !== "string" || password.length < 6)) 
            throw "El password debe ser una cadena de texto de al menos 6 caracteres.";
        if (!validatedEmail && typeof validatedEmail !== "boolean")
            throw "El campo validatedEmail debe ser un booleano.";
        if (!premium && typeof premium !== "boolean")
            throw "El campo premium debe ser un booleano.";
        if (!nivel && (isNaN(Number(nivel)) || nivel < 0))
            throw "El nivel debe ser un número válido y no negativo.";
        if (!exp && (isNaN(Number(exp)) || exp < 0))
            throw "El campo exp debe ser un número válido y no negativo.";
        if (!racha && (isNaN(Number(racha)) || racha < 0))
            throw "El campo racha debe ser un número válido y no negativo.";
        if (!monedas && (isNaN(Number(monedas)) || monedas < 0))
            throw "El campo monedas debe ser un número válido y no negativo.";

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
