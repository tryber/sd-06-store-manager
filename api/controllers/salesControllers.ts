import { Router, Request, Response } from 'express'
import { salesServices } from '../services'

const routesSales = Router();

routesSales.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, body } = await salesServices.getById({ id });
  res.status(status).json(body)
});

routesSales.get('/', async (_req: Request, res: Response) => {
  const { status, body } = await salesServices.getAll();
  res.status(status).json(body)
});

routesSales.post('/', async (req: Request, res: Response) => {
  const itensSold = req.body;
  const { status, body } = await salesServices.create({ itensSold });
  res.status(status).json(body)
});

routesSales.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const itensSold = req.body;
  const { status, body } = await salesServices.update({ id, itensSold });
  res.status(status).json(body)
});

routesSales.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, body } = await salesServices.remove({ id });
  res.status(status).json(body)
});


export default routesSales;