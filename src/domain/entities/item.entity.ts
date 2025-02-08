export class ItemEntity{
    constructor(
        public readonly id: number,
        public readonly nombre: string,
        public readonly precio: number,
    ){}

    public static fromObject(object: {[key: string]: any}){
        const {id, nombre, precio} = object
        if (isNaN(Number(id)) || !id) throw 'Es requerido el id';
        if (!nombre) throw 'es requerido el nombre del item';
        if (!precio || isNaN(Number(precio))) throw 'es requerido el precio'

        return new ItemEntity(id, nombre, precio)
    }
}