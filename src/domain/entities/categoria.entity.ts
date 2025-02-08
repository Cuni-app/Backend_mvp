export class CategoriaEntity{
    constructor(
        public readonly id: number,
        public readonly nombre: string,
        public readonly duracion: number,
    ){}
    
    public static fromObject(object: {[key: string]: any}){
        const {id, nombre, duracion} = object
        if (isNaN(Number(id)) || !id) throw 'id es requerido'
        if (!nombre) throw 'Nombre es requerdido'
        if (!duracion) throw 'Nombre es requerdido'

        return new CategoriaEntity(id, nombre, duracion)
    }
}