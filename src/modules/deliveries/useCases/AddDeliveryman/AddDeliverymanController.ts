import { Request, Response } from "express";
import { AddDeliverymanUseCase } from "./AddDeliverymanUseCase";



export class AddDeliverymanController{
    async handle (request: Request, response: Response){

        const {id_deliveryman} = request;
        const { id: id_delivery } = request.params

        const addDeliverymanUseCase = new AddDeliverymanUseCase();

        const delivery = await addDeliverymanUseCase.execute({
            id_delivery,
            id_deliveryman
        });

        return response.json(delivery);

    }
}