import { Router } from 'express'
import { CreateClientController } from './clients/createClientController'
import { CreateDeliverymanController } from './deliveryman/createDeliverymanController'

const routes = Router()

const createClientController = new CreateClientController()
const createDeliverymanController = new CreateDeliverymanController()

routes.post('/client', createClientController.handle)
routes.post('/deliveryman', createDeliverymanController.handle)


export { routes }