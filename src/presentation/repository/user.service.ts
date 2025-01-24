import { prisma } from "../../data/postgres";

export class UserService {
    constructor() {}

    public async seguir(IdOrigen: number, IdDestino: number) {
        try {
            const seguido = await prisma.follow.create({
                data: {
                    id_seguidor: IdOrigen,
                    id_seguido: IdDestino,
                },
            });
            if (!seguido) return "Error al seguir";

            return seguido;
        } catch (error) {
            throw new Error("Error al crear follow");
        }
    }

    public async getGenteQueSigo(idUsuario: number) {
        try {
            const genteQueSigo = await prisma.follow.findMany({
                where: {
                    id_seguidor: idUsuario,
                },
                include: {
                    seguido: true,
                },
            });
            if (!genteQueSigo)
                return new Error("Error al obtener personas que sigues");

            const data = genteQueSigo.map((follow) => {
                const users = follow.seguido;
                return {
                    id: users.id,
                    nombre: users.nombre,
                    premium: users.premium,
                    nivel: users.nivel,
                    racha: users.racha,
                };
            });

            return data;
        } catch (error) {
            throw new Error("Error al obtener gente que sigo");
        }
    }

    public async getGenteQueMeSigue(idUsuario: number) {
        try {
            const genteQueMeSigue = await prisma.follow.findMany({
                where: {
                    id_seguido: idUsuario,
                },
                include: {
                    seguidor: true,
                },
            });
            if (!genteQueMeSigue)
                return new Error("Error al obtener personas que sigues");
            const data = genteQueMeSigue.map((follow) => {
                const users = follow.seguidor;
                return {
                    id: users.id,
                    nombre: users.nombre,
                    premium: users.premium,
                    nivel: users.nivel,
                    racha: users.racha,
                };
            });

            return data;
        } catch (error) {
            throw new Error("Error al obtener gente que sigo");
        }
    }

    public async dejarDeSeguir(IdOrigen: number, IdDestino: number){
        try {
            const seguido = await prisma.follow.delete({
                where: {
                    id_seguidor_id_seguido: {
                        id_seguidor: IdOrigen,
                        id_seguido: IdDestino
                    }
                },
            });
            if (!seguido) return "Error al dejar de seguir";
            return seguido;
        } catch (error) {
            throw new Error("Error al eliminar follow");
        }
    }
}
