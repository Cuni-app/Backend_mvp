export class PreguntaEntity{
    constructor(
        public readonly id: number,
        public readonly enunciado: string, 
        public readonly imagen_url: string | null,
        public readonly id_categoria: number,
    ){}

    public static fromObject(object: {[key: string]: any}){
        const {id, enunciado, imagen_url, id_categoria} = object;
        if (isNaN(Number(id))) throw 'id es requerido'
        if (isNaN(Number(id_categoria))) throw 'id_categoria es requerido'
        if (!enunciado) throw 'El enunciado es requerido'

        return new PreguntaEntity(id, enunciado, imagen_url, id_categoria)
    }

}