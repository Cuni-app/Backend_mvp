import { RespuestaEntity } from "./respuesta.entity";

export class PreguntaEntity{
    constructor(
        public readonly id: number,
        public readonly enunciado: string, 
        public readonly imagen_url: string | null,
        public readonly solucion_url: string | null,
        public readonly id_categoria: number,
        public readonly respuestas?: RespuestaEntity[]
    ){}

    public static fromObject(object: {[key: string]: any}){
        const {id, enunciado, imagen_url,solucion_url, id_categoria, respuestas } = object;
        if (isNaN(Number(id))) throw 'id es requerido'
        if (isNaN(Number(id_categoria))) throw 'id_categoria es requerido'
        if (!enunciado) throw 'El enunciado es requerido'
        if (typeof imagen_url !== "string" && imagen_url) throw 'debe ser una url'
        if (typeof solucion_url !== "string" && solucion_url) throw 'debe ser una url'
        
        return new PreguntaEntity(id, enunciado, imagen_url, solucion_url,id_categoria, respuestas)
    }

}