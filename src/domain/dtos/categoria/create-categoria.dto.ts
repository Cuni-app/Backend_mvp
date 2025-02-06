export class CreateCategoriaDTO {
    private constructor(
        public readonly nombre: string,
        public readonly duracion: number,
    ) {}

    static create(props: {
        [key: string]: any;
    }): [string?, CreateCategoriaDTO?] {
        const {nombre, duracion } = props;
        if (!nombre) return ["nombre es requerido", undefined];
        if (!duracion) return ["duracion es requerido", undefined];

        return [
            undefined,
            new CreateCategoriaDTO(nombre, duracion),
        ];
    }
}
