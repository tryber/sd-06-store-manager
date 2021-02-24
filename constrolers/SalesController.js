const { Router } = require('express');
const Sales = require('../models/Sales');
const validate = require('../middlewares/SalesValidations');

const SalesController = new Router();

const status0 = 200;

SalesController.post('/', validate.validateQuantity, async (request, response) => {
  const sales = request.body;
  const { insertedId } = await Sales.insertSales(sales);

  const insertedSale = {
    _id: insertedId,
    itensSold: sales,
  };

  return response.status(status0).json(insertedSale);
});

module.exports = SalesController;
