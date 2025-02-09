import { Request, Response } from "express";
import { CreateFollowDTO, CustomError, DejarDeSeguir, FollowRepository, GetSeguidores, GetSeguidos, SeguirFollow } from "../../domain";

export class FollowController {
    constructor(
        private readonly followRepository: FollowRepository
    ) {}

    private handleError = (res: Response, error: unknown) => {
        if (error instanceof CustomError){
            res.status(error.statusCode).json({error: error.message})
            return;
        }
        res.status(500).json({error: error})
    }
    
    public seguir = (req: Request, res: Response) => {
        const idSeguidor = req.body.user.id;
        const idSeguido = req.params.id;
        const [error, createFollowDto] = CreateFollowDTO.create({idSeguidor: +idSeguidor, idSeguido: +idSeguido})
        if (error) return res.status(400).json(error);
        new SeguirFollow(this.followRepository)
            .execute(createFollowDto!)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))        
    };

    public getSeguidos = (req: Request, res: Response) => {
        const {id} = req.query
        const user = req.body.user;
        if (isNaN(user.id)) return res.json({ error: "error en el id origen" });
        new GetSeguidos(this.followRepository)
            .execute(id ? id : user.id)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    };

    public getSeguidores = (req: Request, res: Response) => {
        const {id} = req.query
        const user = req.body.user;
        if (isNaN(user.id)) return res.json({ error: "error en el id origen" });
        new GetSeguidores(this.followRepository)
            .execute(id ? id : user.id)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    };

    public dejarDeSeguir = (req: Request, res: Response) => {
        const UserOrigen = req.body.user;
        if (isNaN(UserOrigen.id)) res.json({ error: "error en el id origen" });

        const idDestino = +req.params.id;

        if (isNaN(+idDestino))
            return res.json({ error: "error en el id destino" });
        new DejarDeSeguir(this.followRepository)
            .execute(idDestino, UserOrigen.id)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    }

    // Funciones para visualización de perfil

    
}
