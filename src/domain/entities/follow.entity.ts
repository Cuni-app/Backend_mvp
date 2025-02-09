export class FollowEntity{
    constructor(
        public readonly id: number,
        public readonly idSeguidor: number,
        public readonly idSeguido: number,
    ){}

    public static fromObject(object: {[key: string]: any}){
        const {id, idSeguidor, idSeguido} = object
        if (isNaN(+id) || !id) throw 'Id es requerido'
        if (isNaN(+idSeguido) || !idSeguido) throw 'IdSeguido es requerido'
        if (isNaN(+idSeguidor) || !idSeguidor) throw 'IdSeguidor es requerido'
        return new FollowEntity(id, idSeguidor, idSeguido)
    }
} 