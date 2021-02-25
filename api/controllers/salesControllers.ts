import { Router } from 'express'
import { salesServices } from '../services'

const routesSales = Router();

routesSales.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, body } = await salesServices.getById({ id });
  res.status(status).json(body)
});

routesSales.get('/', async (req, res) => {
  const { status, body } = await salesServices.getAll();
  res.status(status).json(body)
});

routesSales.post('/', async (req, res) => {
  const itensSold = req.body;
  const { status, body } = await salesServices.create({ itensSold });
  res.status(status).json(body)
});

routesSales.put('/:id', async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const { status, body } = await salesServices.update({ id, itensSold });
  res.status(status).json(body)
});

routesSales.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, body } = await salesServices.remove({ id });
  res.status(status).json(body)
});


export default routesSales;