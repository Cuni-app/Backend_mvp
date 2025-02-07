import { Request, Response } from "express";
import { AuthService } from "../repository/auth.service";
import { error } from "console";
import { UserService } from "../repository/user.service";

export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    
    public seguir = (req: Request, res: Response) => {
        const UserOrigen = req.body.user;
        if (isNaN(UserOrigen.id)) res.json({ error: "error en el id origen" });

        const idDestino = req.params.id;

        if (isNaN(+idDestino))
            return res.json({ error: "error en el id destino" });
        if (+UserOrigen.id === +idDestino) return res.json({ error: "no te puedes seguir a ti mismo" });
        
        this.userService
            .seguir(UserOrigen.id, +idDestino)
            .then((data) => res.json(data))
            .catch((error) => {
                res.status(500).json(error);
            });
    };

    public getSeguidos = (req: Request, res: Response) => {

        const {id} = req.query

        const user = req.body.user;
        if (isNaN(user.id)) return res.json({ error: "error en el id origen" });

        this.userService
            .getGenteQueSigo(id ? +id : user.id)
            .then((data) => res.status(201).json(data))
            .catch((error) => {
                res.status(500).json(error);
            });
    };

    public getSeguidores = (req: Request, res: Response) => {
        const {id} = req.query

        const user = req.body.user;
        if (isNaN(user.id)) return res.json({ error: "error en el id origen" });
        this.userService
            .getGenteQueMeSigue(id ? +id : user.id)
            .then((data) => res.status(201).json(data))
            .catch((error) => res.status(500).json(error));
    };

    public dejarDeSeguir = (req: Request, res: Response) => {
        const UserOrigen = req.body.user;
        if (isNaN(UserOrigen.id)) res.json({ error: "error en el id origen" });

        const idDestino = req.params.id;

        if (isNaN(+idDestino))
            return res.json({ error: "error en el id destino" });

        this.userService
            .dejarDeSeguir(UserOrigen.id, +idDestino)
            .then((data) => res.json(data))
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    // Funciones para visualización de perfil

    public obtenerPerfil = (req: Request, res: Response) => {
        const { id } = req.params;
        const idClient = req.body.user.id
        if (isNaN(+id)) return res.status(401).json("id is not a number");
        this.userService.visualizarPerfilUsuario(+id,idClient).then((data) => res.json(data))
        .catch((error) => res.json({ error: error.message }));
    }
}
