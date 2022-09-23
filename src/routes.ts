import { Router } from 'express'
import { AuthClientController } from './clients/auth/AuthClientController'
import { CreateClientController } from './clients/createClientController'
import { CreateDeliveryController } from './deliveries/CreateDeliveryController'
import { AuthDeliverymanController } from './deliveryman/auth/AuthDeliverymanController'
import { CreateDeliverymanController } from './deliveryman/createDeliverymanController'
import { ensureAthenticateClient } from './middlewares/EnsureAthenticateClient'

export const routes = Router()

const createClientController = new CreateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()

const authClientController = new AuthClientController()
const authDeliverymanController = new AuthDeliverymanController()

//Criação
routes.post('/client', createClientController.handle)
routes.post('/deliveryman', createDeliverymanController.handle)
routes.post('/delivery', ensureAthenticateClient, createDeliveryController.handle)

// Autenticação
routes.post('/client/login', authClientController.handle)
routes.post('/deliveryman/login', authDeliverymanController.handle)