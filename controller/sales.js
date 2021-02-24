const { Router } = require('express');
const { createSale } = require('../modules/salesModules');
const { validateSale, validateId } = require('../services/salesServices');

const SalesRouter = new Router();

const twoHundred = 200;

SalesRouter.get('/sales', async (_req, res) => {
  return res.status(twoHundred).send('Sales here');
});

SalesRouter.post('/sales', validateSale, validateId, async (req, res) => {
  const sale = await createSale(req.body);
  return res.status(twoHundred).json(sale);
});

module.exports = { SalesRouter };
