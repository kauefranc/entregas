import { Request, Response } from "express";
import { AuthDeliverymanUseCase } from "./AuthDeliverymanUseCase";



export class AuthDeliverymanController{
    async handle(request: Request, response: Response){
        const {username, password} = request.body;

        const authDeliverymanUseCase = new AuthDeliverymanUseCase();
        const result = await authDeliverymanUseCase.execute({
            username,
            password
        })
        return response.json(result);

    }
}
