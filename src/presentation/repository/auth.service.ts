import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { envs } from "../../config/envs";
import { JwtAdapter } from "../../config/jwt.adapter";
import { regularExps } from "../../config/regular-exp";
import { prisma } from "../../data/postgres";
import { EmailService } from "./email.service";

export class AuthService {
    constructor(
        //Servicio de email para confirmación de correo
        private readonly emailService: EmailService
    ) {}

    public async registrarUsuario(
        nombre: string,
        email: string,
        contrasenia: string
    ) {
        if (!regularExps.email.test(email)) throw new Error("email no valido");

        const existingEmail = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existingEmail) throw new Error("Email está en uso");

        const hashedPassword = bcryptAdapter.hash(contrasenia);

        const createdUser = await prisma.user.create({
            data: {
                nombre,
                email,
                password: hashedPassword,
            },
        });
        const token = await JwtAdapter.generateToken({ id: createdUser.id });
        if (!token) throw new Error("Error al crear JWT");

        //email de confirmación
        this.sendEmailValidation(createdUser.email);
        const { password, ...userEntity } = createdUser;
        return { userEntity, token };
    }
    public async loginUser(email: string, contrasenia: string | number) {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) throw new Error("Usuario no registrado");
        // if (user.validatedEmail === false) throw new Error('Usuario no validado')
        const isMatch = bcryptAdapter.compare(contrasenia + '', user.password + "");
        if (!isMatch) throw new Error("Contraseña incorrecta");

        const token = await JwtAdapter.generateToken({ id: user.id });
        const { password, ...info } = user;
        return {
            user: info,
            token: token,
        };
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

    public validateEmail = async (token: string) => {
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
    };
}
