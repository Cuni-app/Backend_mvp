export class UpdateRespuestaDTO {
    private constructor(
        public readonly id: number,
        public readonly esCorrecto?: boolean,
        public readonly contenido?: string,
    ) {}
    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.esCorrecto !== undefined)
            returnObj.esCorrecto = this.esCorrecto;
        if (this.contenido !== undefined) returnObj.contenido = this.contenido;
        return returnObj;
    }
    static create(props: {
        [key: string]: any;
    }): [string?, UpdateRespuestaDTO?] {
        const { id, esCorrecto, contenido, id_pregunta } = props;

        if (!id) return ["El id es obligatorio"];
        if (typeof esCorrecto !== "boolean") return ["EsCorrecto debe ser boolean"]
        if (typeof contenido !== "string") return ["contenido debe ser string"]
        return [
            undefined,
            new UpdateRespuestaDTO(id, esCorrecto, contenido),
        ];
    }
}
