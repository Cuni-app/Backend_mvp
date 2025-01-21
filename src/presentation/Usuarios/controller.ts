import { Request, Response } from "express";
import { AuthService } from "../repository/auth.service";
import { error } from "console";

export class UserController {
    constructor(
        private readonly authService: AuthService
    ){}

    public registrarUsuario = (req: Request, res: Response):void => {
        try {
            const {nombre, email, password} = req.body
            this.authService.registrarUsuario(nombre,email,password).then(data => res.json(data)).catch(error => {throw new  Error(error)})
        } catch (error) {
            res.json(error)
        }
        
    }

    public loginUsuario = (req: Request, res: Response) => {
        const {email, password} = req.body
        this.authService.loginUser(email, password)
            .then(user => res.json(user))
            .catch(error => res.json({error: 'Error en el login'}))
    }

    // public confirmarToken = (req: Request, res: Response):void => {
    //     try {
    //         res.json('token confirmado!!')
    //     } catch (error) {
    //         res.json(error)
    //     }
    // }    

    public validateEmail = (req: Request, res: Response) => {
        const {token} = req.params;

        this.authService.validateEmail(token)
            .then(() => res.json('email validated'))
            .catch(error => {throw new Error(error)})
    }
}