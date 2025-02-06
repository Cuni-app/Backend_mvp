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
        if (!idSeguido) return ["idSeguido es requerido", undefined];

        return [
            undefined,
            new CreateFollowDTO( idSeguidor, idSeguido),
        ];
    }
}
