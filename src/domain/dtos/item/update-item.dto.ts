export class UpdateItemDTO {
    private constructor(
        public readonly id: number,
        public readonly nombre?: string,
        public readonly precio?: number,
    ) {}
    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.nombre !== undefined) returnObj.nombre = this.nombre;
        if (this.precio !== undefined)
            returnObj.precio = this.precio;
        return returnObj;
    }
    static create(props: {
        [key: string]: any;
    }): [string?, UpdateItemDTO?] {
        const { id, nombre, precio } = props;

        if (!id) return ["El id es obligatorio"];
        if (typeof nombre !== "string")
            return ["nombre debe ser boolean"];
        if (typeof precio !== "number") return ["precio debe ser number"];
        
        return [
            undefined,
            new UpdateItemDTO(id, nombre, precio),
        ];
    }
}
