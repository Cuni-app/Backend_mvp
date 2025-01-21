import { bcryptAdapter } from "../../config/bcrypt.adapter"
import { JwtAdapter } from "../../config/jwt.adapter"
import { prisma } from "../../data/postgres"

export class AuthService {
    constructor(
        //Servicio de email para confirmación de correo
    ){}

    public async registrarUsuario(user: string,email:string,password:string){
        const existingEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if(existingEmail) throw new Error('Email está en uso')
        
        const hashedPassword = bcryptAdapter.hash(password)

        const createdUser = await prisma.user.create({
            data:{
                nombre: user,
                email,
                password: hashedPassword
            }
        })

        return { createdUser
        }
    }
    public async loginUser(email: string, contrasenia: string){
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) throw new Error('Usuario no registrado')
        // if (user.validatedEmail === false) throw new Error('Usuario no validado')
        const isMatch = bcryptAdapter.compare(contrasenia, user.password)
        if(!isMatch) throw new Error('Contraseña incorrecta');

        const token = await JwtAdapter.generateToken({id: user.id})
        const {password, ...info} = user
        return {
            user: info,
            token: token
        }
    }

    public validateEmail = async (token: string) => {
        const payload = await JwtAdapter.validateToken(token)

    }

}