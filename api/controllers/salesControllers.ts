import { Router } from 'express'

const routesSales = Router();

routesSales.get('/', (req, res) => {
  // const response = productsModel.getAll();
  res.status(200).json({ msg: 'oi'})
});

export default routesSales;