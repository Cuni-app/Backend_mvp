export class CreateItemDTO {
    private constructor(
        public readonly nombre: string,
        public readonly precio: number,
    ) {}

    static create(props: {
        [key: string]: any;
    }): [string?, CreateItemDTO?] {
        const {nombre, precio } = props;
        if (!nombre) return ["nombre es requerido", undefined];
        if (!precio) return ["precio es requerido", undefined];

        return [
            undefined,
            new CreateItemDTO( nombre, precio),
        ];
    }
}
