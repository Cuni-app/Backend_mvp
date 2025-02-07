import { Request, Response } from "express";
import { CambiarContrasenia, CreateUserDTO, CustomError, EnviarCodigo, LoginUser, LoginUserDto, RegistroUsuario, UserRepository, ValidarCodigo } from "../../domain";
import { ValidateEmail } from '../../domain/use-cases/user/validateEmail-user';

export class UserController {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
    private handleError = (res: Response, error: unknown) => {
        if (error instanceof CustomError){
            res.status(error.statusCode).json({error: error.message})
            return;
        }
        res.status(500).json({error: "Internal server error"})
    }
    public registrarUsuario = (req: Request, res: Response) => {
        const [error, createUserDto] = CreateUserDTO.create(req.body);

        if (error) return res.status(400).json(error);
        new RegistroUsuario(this.userRepository)
            .execute(createUserDto!)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    };

    public loginUsuario = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json(error);
        new LoginUser(this.userRepository)
            .execute(loginUserDto!)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    };

    public validateEmail = (req: Request, res: Response) => {
        const { token } = req.params;

        new ValidateEmail(this.userRepository)
            .execute(token)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    };

    public enviarCodigo = (req: Request, res: Response) => {
        const email = req.body.email        
        new EnviarCodigo(this.userRepository)
            .execute(email)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    }

    public validarCodigo = (req: Request, res: Response) => {
        const codigo = req.body.codigo
        return new ValidarCodigo(this.userRepository)
            .execute(codigo)
    }

    public cambiarContrasenia = (req: Request, res: Response) => {
        const email = req.body.email
        const newPassword = req.body.password
        new CambiarContrasenia(this.userRepository)
            .execute(email, newPassword)
            .then(obj => res.status(201).json(obj))
            .catch(error => this.handleError(res, error))
    }

    // public obtenerPerfil = (req: Request, res: Response) => {
    //     const { id } = req.params;
    //     if (isNaN(+id)) return res.status(401).json("id is not a number");
    //     this.userService.visualizarPerfilUsuario(+id).then((data) => res.json(data))
    //     .catch((error) => res.json({ error: error.message }));
    // }
}
