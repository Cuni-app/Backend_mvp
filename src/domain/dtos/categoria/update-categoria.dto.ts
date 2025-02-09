export class UpdateCategoriaDTO {
    private constructor(
        public readonly id: number,
        public readonly nombre: string,
        public readonly duracion: number,
    ) {}
    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.nombre !== undefined)
            returnObj.nombre = this.nombre;
        if (this.duracion !== undefined) returnObj.duracion = this.duracion;
        return returnObj;
    }
    static create(props: {
        [key: string]: any;
    }): [string?, UpdateCategoriaDTO?] {
        const { id, nombre, duracion } = props;

        if (!id) return ["El id es obligatorio"];
        if (nombre && typeof nombre !== "string") return ["nombre debe ser string"]
        if (duracion && typeof duracion !== "number") return ["duracion debe ser number"]
        return [
            undefined,
            new UpdateCategoriaDTO(id, nombre, duracion),
        ];
    }
}
