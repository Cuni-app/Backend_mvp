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
        const user = req.body.user;
        if (isNaN(user.id)) return res.json({ error: "error en el id origen" });

        this.userService
            .getGenteQueSigo(user.id)
            .then((data) => res.status(201).json(data))
            .catch((error) => {
                res.status(500).json(error);
            });
    };

    public getSeguidores = (req: Request, res: Response) => {
        const user = req.body.user;
        if (isNaN(user.id)) return res.json({ error: "error en el id origen" });
        this.userService
            .getGenteQueMeSigue(user.id)
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
}
