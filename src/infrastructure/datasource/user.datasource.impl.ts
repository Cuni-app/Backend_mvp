import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { envs } from "../../config/envs";
import { JwtAdapter } from "../../config/jwt.adapter";
import { myCache } from "../../config/node-cache.adapter";
import { prisma } from "../../data/postgres";
import { CreateUserDTO, CustomError, LoginUserDto, UserDatasource, UserEntity } from "../../domain";
import { EmailService } from '../../presentation/repository/email.service';

export class UserDatasourceImpl implements UserDatasource{
    constructor(
        private readonly emailService: EmailService
    ) {}
    async getById(id: number): Promise<UserEntity> {
        const usuario = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!usuario) throw new CustomError(`Usuario con id:${id} no existe`, 404);
        return UserEntity.fromObject(usuario)
    }

    async getByEmail(email: string): Promise<UserEntity> {
        const usuario = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!usuario) throw new CustomError(`Usuario con email:${email} no existe`, 404);
        return UserEntity.fromObject(usuario)
    }

    async registro(createUserDTO: CreateUserDTO): Promise<{ user: UserEntity; token: string; }> {
        const hashedPassword = bcryptAdapter.hash(createUserDTO.password);
        const usuario = await prisma.user.create({
            data: {
                email: createUserDTO.email,
                nombre: createUserDTO.nombre,
                password: hashedPassword
            }
        })
        if (!usuario) throw new CustomError(`Error al registar el usuario` ,404)
        const token = await JwtAdapter.generateToken({ id: usuario.id });
        if (!token) throw new CustomError("Error al crear JWT", 400);
        this.sendEmailValidation(usuario.email);
        return { user: UserEntity.fromObject(usuario), token: token + ''};

    }

    async login(loginUserDto: LoginUserDto): Promise<{ user: Partial<UserEntity>; token: string; }> {
        const user = await prisma.user.findUnique({
            where: {
                email: loginUserDto.email,
            },
        });
        if (!user) throw new CustomError("Usuario no registrado", 404);
        // if (user.validatedEmail === false) throw new Error('Usuario no validado')

        const isMatch = bcryptAdapter.compare(loginUserDto.password + '', user.password + "");
        if (!isMatch) throw new CustomError("Contraseña incorrecta", 404);
        const token = await JwtAdapter.generateToken({ id: user.id });
        return {token: token + '' , user: {
            email: loginUserDto.email,
            nombre: user.nombre
        }}
    }

    async validateEmail(token: string): Promise<boolean> {
        const payload = await JwtAdapter.validateToken(token);
        if (!payload) throw new Error("invalid token");
        const { email } = payload as { email: string };

        if (!email) throw new Error('Email not in token');

        const user = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                validatedEmail: true
            }
        })

        if (!user) throw new Error('email not exist');

        return true
    }

    async enviarCodigo(email: string): Promise<boolean> {
        const codigo = Math.round(Math.random() * (9999 - 1000) + 1000)
        const objCache = {email}

        const almacenado = myCache.set(codigo, objCache)
        if (!almacenado) throw new CustomError('Error al almacenar el codigo', 400)

        const trueCode = await this.sendEmailPassCode(codigo, email)
        if (!trueCode) throw new CustomError('Error al enviar el mail', 400)

        return true
    }

    validarCodigo(codigo: number): boolean {
        const valor  = myCache.take(codigo)
        if (valor == undefined){
            throw new CustomError('no hay codigo', 404);
        }
        return true
    }

    async cambiarContrasenia(email: string, newPassword: string): Promise<Partial<UserEntity>> {
        const hashedPassword = bcryptAdapter.hash(newPassword);
        const user = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                password: hashedPassword
            }
        })
        return {email, nombre: user.nombre, id: user.id}
    }


    private sendEmailValidation = async (email: string) => {
        const token = await JwtAdapter.generateToken({ email });
        if (!token) throw new Error("Error getting token");
        const link = `${envs.WEBSERVICE_URL}/user/validate-email/${token}`;
        const html = `
        <h1> valida tu email</h1>
        <p>Dale click en el enlace para validar tu email y poder aprender con nosotros</p>
        <a href="${link}">EMPIEZA AHORA: ${email}</a>
        `;
        const options = {
            to: email,
            subject: "Validate your email",
            htmlBody: html,
        };
        const isSent = await this.emailService.sendEmail(options);
        if (!isSent) throw new Error("Error send email"); 
        return true;
    };

    private sendEmailPassCode = async (code: number, email: string) => {
        const html = `
        <h1> tu codigo para cambiar tu contraseña</h1>
        <p>${code}</p>
        `;
        const options = {
            to: email,
            subject: "Cambio de contraseña",
            htmlBody: html,
        };
        const isSent = await this.emailService.sendEmail(options);
        return isSent;
    };
}