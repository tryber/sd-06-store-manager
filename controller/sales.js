const { Router } = require('express');
const salesModules = require('../modules/salesModules');
const { ObjectId } = require('mongodb');
const { validateSales } = require('../services/salesServices');

const salesRouter = new Router();

const SUCESS = 200;

salesRouter.post('/', validateSales, async (req, res) =>  {
  const sale = await salesModules.createSale(req.body);
  res.status(SUCESS).json(sale);
});

salesRouter.get('/', async (_req, res) => {
  const allSales = await salesModules.getAllSales();
  res.status(SUCESS).json({ sales: allSales });
});

salesRouter.get('/:id', async (_req, res) => {
  const { id } = req.params;

  const saleFound = await salesModules.getSaleById(id);

  res.status(SUCESS).json(saleFound);
});


module.exports = { salesRouter };