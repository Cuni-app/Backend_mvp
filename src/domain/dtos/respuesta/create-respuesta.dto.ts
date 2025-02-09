export class CreateRespuestaDTO {
    private constructor(
        public readonly esCorrecto: boolean,
        public readonly contenido: string,
        public readonly id_pregunta: number
    ) {}

    static create(props: {
        [key: string]: any;
    }): [string?, CreateRespuestaDTO?] {
        const {esCorrecto, contenido, id_pregunta } = props;
        if (typeof esCorrecto !== "boolean") return ["esCorrecto es requerido", undefined];
        if (!contenido) return ["contenido es requerido", undefined];
        if (!id_pregunta) return ["id_pregunta es requerido", undefined];

        return [
            undefined,
            new CreateRespuestaDTO(esCorrecto, contenido, id_pregunta),
        ];
    }
}
