import { Request, Response } from "express";
import { prisma } from "../../../../database/PrismaClient";
import { CreateDeliveriesUseCase } from "./CreateDeliveriesUseCase";



export class CreateDeliveriesController {
    async handle(request: Request, response: Response){

       const { item_name } = request.body;
       const { id_client } = request;

       const createDeliveriesUseCase = new CreateDeliveriesUseCase();
       const deliveries = await createDeliveriesUseCase.execute({
            id_client,
            item_name
       });

       return response.json(deliveries);
    }
}