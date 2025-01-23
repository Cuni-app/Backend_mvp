import { Request, Response } from "express";
import { ItemService } from "../repository/item.service";
import { error } from 'console';


export class ItemController {
    
    constructor(
        public readonly itemService: ItemService
    ){}

    crearItem = (req: Request, res: Response) => {
        const {nombre, precio} = req.body
        if(!nombre || !precio) return res.json('Nombre o precio incorrectos')


        this.itemService.crearItem(nombre, +precio)
            .then(item => res.status(201).json(item))
            .catch(error => res.status(500).json(error))
    }

    getItemsPorUsuario = (req: Request, res: Response) => {
        const {email} = req.body.user
        this.itemService.getItemsPorUsuario(email)
            .then(items => res.status(201).json(items))
            .catch(error => res.status(500).json(error))
    }

    eliminarItemPorID = (req: Request, res: Response) => {
        const {id} = req.params
        if(isNaN(+id)) return res.status(402).json('id debe ser un numero')
        
        this.itemService.eliminarItemPorID(+id)
            .then(item => res.status(201).json(item))
            .catch((error) => res.status(500).json(error))
    }

    asignarItemUsuario = (req: Request, res: Response) => {
        const {id} = req.params
        if (isNaN(+id)) return res.status(400).json('id no es un numero');
        const user = req.body.user
        // console.log(user);
        this.itemService.asignarItemUsuario(+id, user.email)
            .then(data => res.status(201).json(data))
            .catch((error) => res.status(500).json(error))
    }
}

