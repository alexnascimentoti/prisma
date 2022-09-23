import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken'

export async function ensureAthenticateClient(
  request: Request, 
  response: Response, 
  next: NextFunction
  ){
    
    const authHeader = request.headers.authorization

    if (!authHeader){
      return response.status(401).json({
        message: "Token missing"
      })
    }

    const [,token] = authHeader.split(" ")

    try {
      const { sub } = verify(token, '5ebe2294ecd0e0f08eab7690d2a6ee69')

      request.id_client = Number(sub)

      return next()

    } catch (error) {
      return response.status(401).json({
        message: "Token is invalid"
      })
    }
}