export class ResultadoEntity {
    constructor(
        public readonly id: number,
        public readonly tiempo: number,
        public readonly calificacion: number,
        public readonly cantidadCorrectas: number,
        public readonly cantidadIncorrectas: number,
        public readonly id_usuario: number,
        public readonly id_categoria: number
    ) {}

    public static fromObject(object: { [key: string]: any }) {
        const {
            id,
            tiempo,
            calificacion,
            cantidadCorrectas,
            cantidadIncorrectas,
            id_usuario,
            id_categoria,
        } = object;
        if (isNaN(Number(id)) || !id) throw "id es requerido";
        if (isNaN(Number(tiempo)) || !tiempo) throw "tiempos es requerido";
        if (isNaN(Number(calificacion)) || !calificacion)
            throw "calificacion es requerido";
        if (isNaN(Number(cantidadCorrectas)) || !cantidadCorrectas)
            throw "cantidadCorrectas es requerido";
        if (isNaN(Number(cantidadIncorrectas)) || !cantidadIncorrectas)
            throw "cantidadIncorrectas es requerido";
        if (isNaN(Number(id_usuario)) || !id_usuario)
            throw "id_usuario es requerido";
        if (isNaN(Number(id_categoria)) || !id_categoria)
            throw "id_categoria es requerido";

        return new ResultadoEntity(
            id,
            tiempo,
            calificacion,
            cantidadCorrectas,
            cantidadIncorrectas,
            id_usuario,
            id_categoria
        );
    }
}
