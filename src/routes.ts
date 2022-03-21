import { Router } from "express";
import { ensureAuthClient } from "./middlewares/ensureAuthClient";
import { ensureAuthDeliveryman } from "./middlewares/ensureAuthDeliveryman";
import { AuthClientController } from "./modules/Auth/AuthClient/AuthClientController";
import { AuthDeliverymanController } from "./modules/Auth/AuthDeliveryman/AuthDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveriesOfClient/FindAllDeliveriesController";
import { AddDeliverymanController } from "./modules/deliveries/useCases/AddDeliveryman/AddDeliverymanController";
import { CreateDeliveriesController } from "./modules/deliveries/useCases/createDeliveries/CreateDeliveriesController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/findAllAvailableController";
import { CreateDeliverymanController } from "./modules/deliverymans/useCases/createDeliveryman/CreateDeliverymanController";

const routes = Router();

//Client
const createClientController = new CreateClientController();
const authClientController = new AuthClientController();
const findAllDeliveriesController = new FindAllDeliveriesController();

routes.post('/auth-client/', authClientController.handle);
routes.post('/client/', createClientController.handle);
routes.get('/client/deliveries', ensureAuthClient, findAllDeliveriesController.handle);

//Deliveryman
const createDeliverymanController = new CreateDeliverymanController();
const authDeliverymanController = new AuthDeliverymanController();

routes.post('/auth-deliveryman/', authDeliverymanController.handle);
routes.post('/deliveryman/', createDeliverymanController.handle);

//Deliveries
const createDeliveriesController = new CreateDeliveriesController();
const findAllAvailableController = new FindAllAvailableController();
const addDeliverymanController = new AddDeliverymanController();

routes.post('/deliveries/', ensureAuthClient, createDeliveriesController.handle);
routes.get('/deliveries/available', ensureAuthDeliveryman, findAllAvailableController.handle);
routes.put('/deliveries/AddDeliveryman/:id', ensureAuthDeliveryman, addDeliverymanController.handle);


export {routes} 