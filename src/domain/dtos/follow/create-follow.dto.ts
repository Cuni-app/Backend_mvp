export class CreateFollowDTO {
    private constructor(
        public readonly idSeguidor: number,
        public readonly idSeguido: number,
    ) {}

    static create(props: {
        [key: string]: any;
    }): [string?, CreateFollowDTO?] {
        const {idSeguidor, idSeguido } = props;
        if (!idSeguidor) return ["idSeguidor es requerido", undefined];
        if (isNaN(idSeguidor)) return ["idSeguidor debe ser un numero", undefined];
        if (!idSeguido) return ["idSeguido es requerido", undefined];
        if (isNaN(idSeguido)) return ["idSeguido debe ser un numero", undefined];

        return [
            undefined,
            new CreateFollowDTO( idSeguidor, idSeguido),
        ];
    }
}
