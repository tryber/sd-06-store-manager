const { Router } = require('express');
const Sales = require('../models/Sales');
const validate = require('../middlewares/SalesValidations');
const service = require('../services/SalesService');

const SalesController = new Router();

const status0 = 200;

SalesController.post('/', validate.validateQuantity, async (request, response) => {
  const itensSold = request.body;
  const { insertedId } = await Sales.insertSales(itensSold);

  const insertedSale = {
    _id: insertedId,
    itensSold,
  };

  await service.updateQuantity(itensSold);

  return response.status(status0).json(insertedSale);
});

SalesController.get('/:id', validate.saleExists, async (request, response) => {
  const { id } = request.params;

  const sale = await Sales.findById(id);

  response.status(status0).json(sale);
});

SalesController.get('/', async (_request, response) => {
  const sales = await Sales.getAllSales();
  response.status(status0).json({ sales });
});

SalesController.put('/:id', validate.validateQuantity, async (request, response) => {
  const { id } = request.params;
  const sale = request.body;

  await service.updateQuantityOfSale(id, sale);
  await Sales.updateSale(id, sale);
  const result = await Sales.findById(id);

  response.status(status0).json(result);
});

SalesController.delete('/:id', validate.idFormat, async (request, response) => {
  const { id } = request.params;

  const result = await Sales.findById(id);
  await service.updateDelete(result);
    
  await Sales.deleteSale(id);

  response.status(status0).json(result);
});

module.exports = SalesController;
