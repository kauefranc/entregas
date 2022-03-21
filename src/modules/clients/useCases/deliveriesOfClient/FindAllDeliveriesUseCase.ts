import { prisma } from "../../../../database/PrismaClient"

interface IFindAll{
    id_client: string
}

export class FindAllDeliveriesUseCase {
    async execute({id_client} : IFindAll){
        // const deliveries = await prisma.deliveries.findMany({
        //     where: {
        //         id_client
        //     }
        // })
        const  deliveries = await prisma.clients.findMany({
            where: {
                id: id_client
            },
            include: {
                Deliveries: true
            }
        })

        return deliveries
    }
}