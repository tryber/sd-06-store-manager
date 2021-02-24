
import { Router } from 'express'
import routesProducts from './productsControllers'
import routesSales from './salesControllers'

const routes = Router();

routes.use('/products', routesProducts);
routes.use('/sales', routesSales);

export default routes;