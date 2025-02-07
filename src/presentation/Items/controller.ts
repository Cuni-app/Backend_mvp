import { Request, Response } from "express";
import { AsignarItem, CreateItem, CreateItemDTO, CustomError, DeleteItembyId, GetItemsByUser, ItemRepository } from "../../domain";


export class ItemController {
    
    constructor(
        public readonly itemRepository: ItemRepository
    ){}
    private handleError = (res: Response, error: unknown) => {
        if (error instanceof CustomError){
            res.status(error.statusCode).json({error: error.message})
            return;
        }
        res.status(500).json({error: "Internal server error"})
    }
    public crearItem = (req: Request, res: Response) => {
        const [error, createItemDto] = CreateItemDTO.create(req.body)
        if (error) return res.status(400).json(error);
        new CreateItem(this.itemRepository)
            .execute(createItemDto!)
            .then(cat => res.status(201).json(cat))
            .catch(error => this.handleError(res, error))
    }

    public getItemsPorUsuario = (req: Request, res: Response) => {
        const {email} = req.body.user
        new GetItemsByUser(this.itemRepository)
            .execute(email)
            .then(cat => res.status(201).json(cat))
            .catch(error => this.handleError(res, error))
    }

    public eliminarItemPorID = (req: Request, res: Response) => {
        const {id} = req.params
        if(isNaN(+id)) return res.status(402).json('id debe ser un numero')
        
        new DeleteItembyId(this.itemRepository)
            .execute(+id)
            .then(cat => res.status(201).json(cat))
            .catch(error => this.handleError(res, error))
    }

    public asignarItemUsuario = (req: Request, res: Response) => {
        const {id} = req.params
        if (isNaN(+id)) return res.status(400).json('id no es un numero');
        const {email} = req.body.user
        // console.log(user);
        new AsignarItem(this.itemRepository)
            .execute(+id, email)
            .then(cat => res.status(201).json(cat))
            .catch(error => this.handleError(res, error))
    }
}

