const { Router } = require('express');
const Sales = require('../services/salesService');

const salesRouter = new Router();

const SUCCESS = 200;
const NOTFOUND = 422;

salesRouter.get('/', async (_req, res) => {
  const sales = await Sales.getAll();
  res.status(SUCCESS).json({ sales });
});

salesRouter.post('/', Sales.idValidation, Sales.validate,  async (req, res) => {
  const sale = await Sales.create(req.body);
  res.status(SUCCESS).json(sale);
});

salesRouter.get('/:id', Sales.saleIdValidation, async (req, res) => {
  const { id } = req.params;
  const sale = await Sales.getById(id);
  if(!sale) return res.status(NOTFOUND).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  });
  res.status(SUCCESS).json(sale);
});

salesRouter.put('/:id', Sales.validate, Sales.saleIdValidation, async (req, res) => {
  const { id } = req.params;
  await Sales.update(id, req.body);
  const sale = await Sales.getById(id);
  res.status(SUCCESS).json(sale);
});

salesRouter.delete('/:id', Sales.deleteIdValidation,
  async (req, res) => {
    const { id } = req.params;
    const sale = await Sales.getById(id);
    await Sales.remove(id);
    return res.status(SUCCESS).json(sale);
  });

module.exports = salesRouter;
