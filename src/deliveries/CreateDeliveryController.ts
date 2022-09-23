import { Request, Response } from "express";
import { CreateDeliveryeUseCase } from "./CreateDeliveryeUseCase";


export class CreateDeliveryController{
  async handle(request: Request, response: Response){
    const { item_name } = request.body
    const { id_client } = request

    const createDeliveryesUseCase = new CreateDeliveryeUseCase()
    const deliveries = await createDeliveryesUseCase.execute({ item_name, id_client })

    return response.json(deliveries)
  }
}