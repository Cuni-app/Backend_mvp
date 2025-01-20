import { Request, Response } from "express";

export class UserController {
    constructor(){}

    public registrarUsuario = (req: Request, res: Response):void => {
        try {
            console.log("El usuario se ha registrado")
            res.json("Usuario registrado")
        } catch (error) {
            res.json(error)
        }
        
    }

    public confirmarToken = (req: Request, res: Response):void => {
        try {
            res.json('token confirmado!!')
        } catch (error) {
            res.json(error)
        }
    }    
}