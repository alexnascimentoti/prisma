import { prisma } from "../database/prismaClient";
import { hash } from 'bcrypt'

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ password, username }: ICreateClient) {
    //validar se o client existe
    const existe = await prisma.clients.findFirst({
      where: {
        username,
      },
    });
    if (existe){
      throw new Error("Cliente já existe");
    }
    //criptografar a senha
    const hashPassword = await hash(password, 10);
    //salvar o client
    const client = await prisma.clients.create({
      data:{
        password: hashPassword,
        username
      }
    })

    return client
  }
}
