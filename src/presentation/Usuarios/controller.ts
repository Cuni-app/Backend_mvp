import { Request, Response } from "express";
import { AuthService } from "../repository/auth.service";
import { error } from "console";
import { UserService } from "../repository/user.service";

export class UserController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    public registrarUsuario = (req: Request, res: Response): void => {
        try {
            const { nombre, email, password } = req.body;
            this.authService
                .registrarUsuario(nombre, email, password)
                .then((data) => res.json(data))
                .catch((error) => res.json({ error: error.message }));
        } catch (error) {
            res.json(error);
        }
    };

    public loginUsuario = (req: Request, res: Response) => {
        const { email, password } = req.body;
        this.authService
            .loginUser(email, password)
            .then((user) => res.json(user))
            .catch((error) => res.json({ error: "Error en el login" }));
    };

    public validateEmail = (req: Request, res: Response) => {
        const { token } = req.params;

        this.authService
            .validateEmail(token)
            .then(() => res.json("email validated"))
            .catch((error) => {
                throw new Error(error);
            });
    };

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
