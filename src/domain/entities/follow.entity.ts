import { CustomError } from "../errors"

export class FollowEntity{
    constructor(
        public readonly id: number,
        public readonly idSeguidor: number,
        public readonly idSeguido: number,
    ){}

    public static fromObject(object: {[key: string]: any}){
        const {id, idSeguidor, idSeguido} = object
        if (isNaN(+id) || !id) throw new CustomError('Id es requerido')
        if (isNaN(+idSeguido) || !idSeguido) throw new CustomError('IdSeguido es requerido')
        if (isNaN(+idSeguidor) || !idSeguidor) throw new CustomError('IdSeguidor es requerido')
        return new FollowEntity(id, idSeguidor, idSeguido)
    }
} 