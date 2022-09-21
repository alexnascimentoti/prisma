import { prisma } from "../database/prismaClient";
import { hash } from 'bcrypt'

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ password, username }: ICreateDeliveryman) {
    //validar se o deliveryman existe
    const existe = await prisma.deliveryman.findFirst({
      where: {
        username: { mode: "insensitive" },
      },
    });
    if (existe){
      throw new Error("Deliveryman já existe");
    }
    //criptografar a senha
    const hashPassword = await hash(password, 10);
    //salvar o deliveryman
    const deliveryman = await prisma.deliveryman.create({
      data:{
        password: hashPassword,
        username
      }
    })

    return deliveryman
  }
}
