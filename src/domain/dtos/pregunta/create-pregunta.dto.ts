export class CreatePreguntaDTO {
    private constructor(
        public readonly enunciado: string,
        public readonly imagen_url: string | null,
        public readonly solucion_url: string | null,
        public readonly id_categoria: number
    ) {}

    static create(props: {
        [key: string]: any;
    }): [string?, CreatePreguntaDTO?] {
        const {enunciado, imagen_url, solucion_url, id_categoria } = props;
        if (!enunciado) return ["enunciado es requerido", undefined];
        if (!id_categoria) return ["id_categoria es requerido", undefined];

        return [
            undefined,
            new CreatePreguntaDTO( enunciado, imagen_url,solucion_url, +id_categoria),
        ];
    }
}
