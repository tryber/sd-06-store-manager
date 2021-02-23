const { Router } = require('express');
const SaleService = require('../services/SalesService');

const SalesControllerRouter = Router();
const SC_OK = 200;
const CREATED = 201;
const SC_NO_CONTENT = 204;
const SC_NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;
const NAME_MIN_LENGHT = 5;
const ZERO = 0;

SalesControllerRouter.get('/', async (_req, res) => {
  const sales = await SaleService.getAll();
  res.status(SC_OK).json(sales);
});


SalesControllerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const sales = await SaleService.findById(id);

  if (!sales) return res.status(SC_NOT_FOUND).json({message: 'sales not found'});

  res.status(SC_OK).json(sales);
});

SalesControllerRouter.post('/', async (req, res) => {
  const { itensSold } = req.body;
  const sales = await SaleService.create(itensSold[0]);
  res.status(CREATED).json(sales);
});

SalesControllerRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  await SaleService.update(id, quantity);

  res.status(SC_NO_CONTENT).end();
});

SalesControllerRouter.delete('/:id', async(req, res) => {
  const { id } = req.params;

  await SaleService.remove(id);

  res.status(SC_NO_CONTENT).end();
});

module.exports = SalesControllerRouter;
