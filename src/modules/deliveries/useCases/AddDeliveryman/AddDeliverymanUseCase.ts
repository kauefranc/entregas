import { prisma } from "../../../../database/PrismaClient"


interface IAddDeliveryman{
    id_deliveryman: string,
    id_delivery: string
}

export class AddDeliverymanUseCase {
    async execute({id_delivery, id_deliveryman} : IAddDeliveryman){

        const result = await prisma.deliveries.update({
            where: {
                id: id_delivery
            },
            data: {
                id_deliveryman
            }
        })

        return result;
    }
}