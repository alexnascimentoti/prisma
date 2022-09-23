import { prisma } from "../../database/prismaClient"
import { compare } from 'bcrypt'
import {sign} from 'jsonwebtoken'

interface IAuthenticateClient {
  username: string,
  password: string
}


export class AuthenticateClientUseCase {
  async execute({ password, username }: IAuthenticateClient){
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if (!client){
      throw new Error("Username ou password inválido!")
    }

    const passwordMatch = await compare(password, client.password)

    if (!passwordMatch){
      throw new Error("Username ou password inválido!")
    }

    const token = sign({ username }, '5ebe2294ecd0e0f08eab7690d2a6ee69', {
      subject: `${client.id}`,
      expiresIn: '1d'
    })

    return token
  }
}