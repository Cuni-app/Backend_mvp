export class CreateResultadoDTO {
    private constructor(
        public readonly tiempo: number,
        public readonly calificacion: number,
        public readonly cantidadCorrectas: number,
        public readonly cantidadIncorrectas: number,
        public readonly id_usuario: number,
        public readonly id_categoria: number
    ) {}

    static create(props: {
        [key: string]: any;
    }): [string?, CreateResultadoDTO?] {
        const {
            tiempo,
            calificacion,
            cantidadCorrectas,
            cantidadIncorrectas,
            id_usuario,
            id_categoria,
        } = props;
        if (!tiempo) return ["tiempo es requerido", undefined];
        if (!calificacion) return ["calificacion es requerido", undefined];
        if (!cantidadCorrectas)
            return ["cantidadCorrectas es requerido", undefined];
        if (!cantidadIncorrectas)
            return ["cantidadIncorrectas es requerido", undefined];
        if (!id_categoria) return ["id_categoria es requerido", undefined];
        if (!id_usuario) return ["id_usuario es requerido", undefined];

        return [
            undefined,
            new CreateResultadoDTO(
                tiempo,
                calificacion,
                cantidadCorrectas,
                cantidadIncorrectas,
                id_usuario,
                id_categoria
            ),
        ];
    }
}
