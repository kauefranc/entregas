import { Request, Response } from "express";
import { AuthClientUseCase } from "./AuthClientUseCase";



export class AuthClientController{
    async handle(request: Request, response: Response){
        const {username, password} = request.body;

        const authClientUseCase = new AuthClientUseCase();
        const result = await authClientUseCase.execute({
            username,
            password
        })

        return response.json(result)
    }
}