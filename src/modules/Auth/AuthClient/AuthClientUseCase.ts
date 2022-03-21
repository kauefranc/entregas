import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/PrismaClient";


interface IAuthClient{
        username: string,
        password: string,
}

export class AuthClientUseCase {

        async execute({username, password}: IAuthClient){

                const client = await prisma.clients.findFirst({
                        where: {
                                username
                        }
                })

                if(!client){
                        throw new Error("Username or password invalid")
                }

                const passwordMatch = await compare(password, client.password);

                if(!passwordMatch){
                        throw new Error("Username or password invalid")
                }

                const token = sign({username}, "cff35956e5d075b7b997844c36f1758d", {
                        subject: client.id,
                        expiresIn: "1d"
                });
                
                return token;

        }
}