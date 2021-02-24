const { Router } = require('express');
const Sales = require('../services/salesService');

const salesRouter = new Router();

const SUCCESS = 200;

salesRouter.get('/', async (_req, res) => {
  const sales = await Sales.getAll();
  res.status(SUCCESS).json({ sales });
});

salesRouter.post('/', Sales.idValidation, Sales.validate,  async (req, res) => {
  const sale = await Sales.create(req.body);
  res.status(SUCCESS).json(sale);
});

salesRouter.get('./:id', Sales.idValidation, async (req, res) => {
  
});

module.exports = salesRouter;
