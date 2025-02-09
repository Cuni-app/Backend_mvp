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
        if (isNaN(+id) || !id) throw "id es requerido";
        if (isNaN(+tiempo) || !tiempo) throw "tiempos es requerido";
        if (isNaN(+calificacion) || !calificacion)
            throw "calificacion es requerido";
        if ((typeof cantidadCorrectas !== "number" && cantidadCorrectas === 0))
            throw "cantidadCorrectas es requerido";
        if ((typeof cantidadIncorrectas !== "number" && cantidadIncorrectas === 0))
            throw "cantidadIncorrectas es requerido";
        if (isNaN(+id_usuario) || !id_usuario)
            throw "id_usuario es requerido";
        if (isNaN(+id_categoria) || !id_categoria)
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
