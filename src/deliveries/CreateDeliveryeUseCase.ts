import { prisma } from "../database/prismaClient"

interface ICreateDelivery{
  item_name: string,
  id_client: number
}


export class CreateDeliveryeUseCase{
  async execute ({ id_client, item_name }: ICreateDelivery){
    const delivery = await prisma.deliveries.create({
      data: {
        item_name,
        id_client
      }
    })

    return delivery
  }
}