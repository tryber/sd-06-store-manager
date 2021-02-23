const { Router } = require('express');
const SaleService = require('../services/SalesService');

const SalesControllerRouter = Router();
const SC_OK = 200;
const SC_NO_CONTENT = 204;
const SC_NOT_FOUND = 404;

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
  // console.log(itensSold);
  // const { quantity } = req.body.itensSold[0];
  // console.log(quantity);
  // console.log(req.body.itensSold[0].quantity);
  // const { quantity } = req.body;

  const sales = await SaleService.create(itensSold[0]);
  
  res.status(SC_OK).json(sales);
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
