import { prisma } from "../../database/prismaClient"
import { compare } from 'bcrypt'
import {sign} from 'jsonwebtoken'

interface IAuthenticateDeliveryman {
  username: string,
  password: string
}


export class AuthenticateDeliverymanUseCase {
  async execute({ password, username }: IAuthenticateDeliveryman){
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if (!deliveryman){
      throw new Error("Username ou password inválido!")
    }

    const passwordMatch = await compare(password, deliveryman.password)

    if (!passwordMatch){
      throw new Error("Username ou password inválido!")
    }

    const token = sign({ username }, '5ebe2294ecd0e0f08eab7690d2a6ee69', {
      subject: `${deliveryman.id}`,
      expiresIn: '1d'
    })

    return token
  }
}