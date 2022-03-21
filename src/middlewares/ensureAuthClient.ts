import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
    sub: string
}

export async function ensureAuthClient(request:Request, response: Response, next: NextFunction) { 

    const authHeader = request.headers.authorization;
    if(!authHeader){
        return response.status(401).json({
            message: "Token expired or missing"
        })
    }

    //pega apenas o token tirando o bearer
    //como vem por padrao => Bearer 9B293-2939412-921931
    const [, token] = authHeader.split(" ");

    try {
        const {sub} = verify(token, "cff35956e5d075b7b997844c36f1758d") as IPayload
        request.id_client = sub;
        return next();
    } catch(error){
        return response.status(401).json({
            message: "Invalid token =("
        })
    }
}