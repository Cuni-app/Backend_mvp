import { Request, Response } from "express";

export class CategoriaController {
    constructor(){}

    public getHolaMundo = (req: Request, res: Response): void => {
        console.log('Hola Mundo');
        res.json('hola')
    }
}