import { Request, Response } from "express";
import { AuthenticateDeliverymanUseCase } from "./AuthDeliverymanUseCase";

export class AuthDeliverymanController{
  async handle(request: Request, response: Response){
    const { username, password } = request.body

    const authDeliverymanUseCase = new AuthenticateDeliverymanUseCase()
    const result = await authDeliverymanUseCase.execute({
      username,
      password
    })

    return response.json(result)
  }
}