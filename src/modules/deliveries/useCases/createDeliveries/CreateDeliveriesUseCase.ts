import { prisma } from "../../../../database/PrismaClient"

interface ICreateDeliveries {
        id_client: string
        item_name: string
}

export class CreateDeliveriesUseCase {
        async execute({id_client, item_name}: ICreateDeliveries){

                const deliveries = await prisma.deliveries.create({
                        data: {
                            id_client,
                            item_name,
                        }
                })

                return deliveries;
        }
}