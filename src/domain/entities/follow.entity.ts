export class followEntity{
    constructor(
        public readonly id: number,
        public readonly idSeguidor: number,
        public readonly idSeguido: number,
    ){}

    public static fromObject(object: {[key: string]: any}){
        const {id, idSeguidor, idSeguido} = object
        if (isNaN(Number(id)) || !id) throw 'Id es requerido'
        if (isNaN(Number(idSeguido)) || !idSeguido) throw 'IdSeguido es requerido'
        if (isNaN(Number(idSeguidor)) || !idSeguidor) throw 'IdSeguidor es requerido'
    }
} 