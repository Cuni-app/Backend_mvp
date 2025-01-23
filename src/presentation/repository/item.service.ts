import { prisma } from "../../data/postgres";


export class ItemService{
    constructor(){}

    public async crearItem(_nombre: string, _precio: number){
        try {
            
            const item = await prisma.item.create({
                data: {
                    nombre: _nombre,
                    precio: _precio
                }
            })
            const {nombre, precio} = item
            return {
                nombre,
                precio: precio.toString()
            }
        } catch (error) {
            throw new Error('Error al crear item')
        }
    }

    public async getItemsPorUsuario(email: string){
        const user = await prisma.user.findUnique({
            where:{
                email
            },
            include: {
                items: true
            }
        })
        if (!user?.items) throw new Error('items no encontrados')
        const arregloItems = user.items
        const data = arregloItems.map(item => {
            return {
                id: item.id,
                nombre: item.nombre,
                precio: item.precio.toString()
            }
        })
        return data
    }

    public async eliminarItemPorID(idItem: number){
        try {
            const itemEliminado = await prisma.item.delete({
                where: {
                    id: idItem
                }
            })
            const {nombre, precio} = itemEliminado
            return {
                nombre,
                precio: precio.toString()
            }
        } catch (error) {
            throw new Error('Error al eliminar ')
        }
    }
    async asignarItemUsuario(idItem: number, emailuser: string){
        try {
            const user = await prisma.user.update({
                where:{
                    email: emailuser
                },
                data: {
                    items: {
                        connect:{
                            id: idItem
                        }
                    }
                }
            })
            const item = await prisma.item.findUnique({
                where:{
                    id: idItem
                }
            })
            if (!item) throw new Error('item no encontrado')
            const {nombre,email} = user
            return {nombre, email, item: item.nombre}

        } catch (error) {
            throw new Error('Error al asignar un item al usuario')
        }
    }
}


