const { Router } = require('express');
const salesModules = require('../modules/salesModules');
const { ObjectId } = require('mongodb');
const {
  validateSales,
  validateId,
  validateDeleteId } = require('../services/salesServices');

const salesRouter = new Router();

const SUCESS = 200;
const NOT_FOUND = 404;
const invalidData = 422;

salesRouter.post('/', validateSales, async (req, res) =>  {
  const sale = await salesModules.createSale(req.body);
  res.status(SUCESS).json(sale);
});

salesRouter.get('/', async (_req, res) => {
  const allSales = await salesModules.getAllSales();
  res.status(SUCESS).json({ sales: allSales });
});

salesRouter.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;

  const saleFound = await salesModules.getSaleById(id);

  if (!saleFound) return res.status(NOT_FOUND).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  });

  res.status(SUCESS).json(saleFound);
});

salesRouter.put('/:id', validateId, validateSales, async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  await salesModules.updateSale(id, data);

  const saleUpdated = {
    _id: ObjectId(id),
    itensSold: data,
  };

  res.status(SUCESS).json(saleUpdated);
});

salesRouter.delete('/:id', validateDeleteId, async (req, res) => {
  const { id } = req.params;
  const saleDeleted = await salesModules.getSaleById(id);

  await salesModules.deleteSale(id);

  res.status(SUCESS).json(saleDeleted);
});

module.exports = { salesRouter };
