import { prisma } from "../../../../database/PrismaClient"
import { hash } from 'bcrypt'

interface ICreateDeliveryman {
        username: string
        password: string
}

export class CreateDeliverymanUseCase {
        async execute({username, password}: ICreateDeliveryman){

            const deliverymanExists = await prisma.deliveryman.findFirst({
                where: {
                    username: {
                        equals: username,
                        mode: 'insensitive'
                    }
                }
            })
            
            if(deliverymanExists){
                console.log(deliverymanExists)
                throw new Error("Sorry, this username is Already in use!")
            }

            const passwordHash = await hash(password, 10);
            const deliveryman = await prisma.deliveryman.create({
                data: {
                    username,
                    password: passwordHash
                }
            })

            return deliveryman;
        }
}