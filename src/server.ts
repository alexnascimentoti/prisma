import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { routes } from './routes'

const app = express()
app.use(express.json())
app.use(routes)

//middleware para tratar o lançamento de exceção throw 
app.use((err : Error, request: Request, response: Response, next: NextFunction) =>{
  if ( err instanceof Error ){
    return response.status(400).json({
      message: err.message
    })
  }
   
  return response.status(500).json({
    message: 'Internal Server Error',
    status: 'error'
  })
})

app.listen(3000, () => { console.log('Express server listening on port 3000') })