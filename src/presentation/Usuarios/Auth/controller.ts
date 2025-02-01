import { Request, Response } from "express";
import { AuthService } from "../../repository/auth.service";
import { error } from "console";
import { UserService } from "../../repository/user.service";

export class AuthController {
    constructor(
        private readonly authService: AuthService
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
            .catch((error) => res.json({ error: error.message }));
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
    public enviarCodigo = (req: Request, res: Response) => {
        const email = req.body.email        
        this.authService.enviarCodigo( email)
            .then(data => res.status(201).json(data))
            .catch((error) => res.json({ error: error.message }));
    }

    public recibirCodigo = (req: Request, res: Response) => {
        const codigo = req.body.codigo
        this.authService.recibirCodigo(codigo)
            .then(data => res.status(201).json(data))
            .catch((error) => res.json({ error: error.message }));
    }

    public cambiarContrasenia = (req: Request, res: Response) => {
        const email = req.body.email
        const newPassword = req.body.password
        this.authService.cambiarContrasenia(email, newPassword)
            .then(data => res.status(201).json(data))
            .catch((error) => res.json({ error: error.message }));
    }

}
