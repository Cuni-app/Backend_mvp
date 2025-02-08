export class UpdatePreguntaDTO {
    private constructor(
        public readonly id: number,
        public readonly enunciado: string,
        public readonly imagen_url: string | null,
        public readonly solucion_url: string | null,
        public readonly id_categoria: number
    ) {}
    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.enunciado !== undefined) returnObj.enunciado = this.enunciado;
        if (this.imagen_url !== undefined)
            returnObj.imagen_url = this.imagen_url;
        if (this.id_categoria !== undefined)
            returnObj.id_categoria = this.imagen_url;
        return returnObj;
    }
    static create(props: {
        [key: string]: any;
    }): [string?, UpdatePreguntaDTO?] {
        const { id, enunciado, imagen_url, solucion_url,id_categoria } = props;

        if (!id) return ["El id es obligatorio"];
        if (typeof id_categoria !== "number")
            return ["id_categoria debe ser numero"];
        if (typeof enunciado !== "string") return ["enunciado debe ser string"];
        if (imagen_url !== null && typeof imagen_url !== "string")
            return ["imagen_url debe ser una cadena de texto o null"];
        if (imagen_url && !/^https?:\/\/\S+$/.test(imagen_url))
            return ["imagen_url debe ser una URL válida"];
        if (solucion_url !== null && typeof solucion_url !== "string")
            return ["solucion_url debe ser una cadena de texto o null"];
        if (solucion_url && !/^https?:\/\/\S+$/.test(solucion_url))
            return ["solucion_url debe ser una URL válida"];

        return [
            undefined,
            new UpdatePreguntaDTO(id, enunciado, imagen_url, solucion_url,id_categoria),
        ];
    }
}
