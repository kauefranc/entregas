import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/PrismaClient"

interface IAuthDeliveryman{
    username: string,
    password: string
}

export class AuthDeliverymanUseCase{
    async execute({username, password}: IAuthDeliveryman){

        const deliveryman = await prisma.deliveryman.findFirst({
            where:{
                username
            }
        });

        if(!deliveryman){
            throw new Error("Username or password invalid")
        }

        const passwordMatch = await compare(password, deliveryman.password);
        if(!passwordMatch){
            throw new Error("Username or password invalid")
        }
        const token = sign({username}, "cff35956e5d075b7b997844c36f1758b", {
            subject: deliveryman.id,
            expiresIn: "1d"
        });

        return token;
    }
}