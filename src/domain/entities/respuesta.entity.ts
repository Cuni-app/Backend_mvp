import { CustomError } from "../errors";

export class RespuestaEntity{
    constructor(
        public readonly id: number,
        public readonly esCorrecto: boolean,
        public readonly contenido: string,
        public readonly id_pregunta: number
    ){}

    public static fromObject(object: {[key: string]: any}){
        const {id, esCorrecto, contenido, id_pregunta} = object
        if (isNaN(+id)) throw new CustomError('id es requerido')
        if (isNaN(+id_pregunta)) throw new CustomError('id_pregunta es requerido')
        if (typeof esCorrecto !== "boolean") throw new CustomError('esCorrecto es requerido y debe ser boolean')
        if (!contenido) throw new CustomError('Contenido es requerido')

        return new RespuestaEntity(id, esCorrecto, contenido, id_pregunta)
    }
}