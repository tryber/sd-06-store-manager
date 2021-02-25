import { Router, Request, Response } from 'express'
import { productsServices } from '../services'

const routesProducts = Router();

routesProducts.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, body } = await productsServices.getById({ id });
  res.status(status).json(body)
});

routesProducts.get('/', async (_req: Request, res: Response) => {
  const { status, body } = await productsServices.getAll();
  res.status(status).json(body)
});

routesProducts.post('/', async (req: Request, res: Response) => {
  const { name, quantity } = req.body;
  const { status, body } = await productsServices.create({ name, quantity });
  res.status(status).json(body)
});

routesProducts.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { status, body } = await productsServices.update({ id, name, quantity });
  res.status(status).json(body)
});

routesProducts.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, body } = await productsServices.remove({ id });
  res.status(status).json(body)
});


export default routesProducts;