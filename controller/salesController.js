const express = require('express');
const rescue = require('express-rescue');
const { validation } = require('../middlewares/validateSales');
const { createSaleValidation } = require('../service/salesService');

const salesController = express.Router();

const UNPROCESABLE_ENTITY = 422;
const OK = 200;
const CREATED = 201;


salesController.post('/', validation, rescue(async (request, response) => {
  const sales = request.body;
  const result = await createSaleValidation(sales);

  if (result.err) return response.status(UNPROCESABLE_ENTITY).json(result);

  response.status(CREATED).json(result);
}));

module.exports = {
  salesController,
};
