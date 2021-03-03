const express = require('express');
const rescue = require('express-rescue');

const { validation } = require('../middlewares/validateSales');
const { getSaleById } = require('../models/salesModel');
const {
  createSaleValidation,
  getSaleValidation,
  getSaleByIdValidation,
  updateSaleValidation,
} = require('../service/salesService');

const salesController = express.Router();

const UNPROCESABLE_ENTITY = 422;
const NOT_FOUND = 404;
const OK = 200;

salesController.post('/:id', validation, rescue(async (request, response) => {
  const { id } = request.params;
  const sales = request.body;

  const updatedSale = await updateSaleValidation(id, sales);

  if (updatedSale.err) return response.status(UNPROCESABLE_ENTITY).json(updatedSale);

  response.status(OK).json(updatedSale);
}));

salesController.post('/', validation, rescue(async (request, response) => {
  const sales = request.body;
  const result = await createSaleValidation(sales);

  if (result.err) return response.status(UNPROCESABLE_ENTITY).json(result);

  response.status(OK).json(result);
}));

salesController.get('/:id', rescue(async (request, response) => {
  const { id } = request.params;
  console.log(typeof id);

  const sale = await getSaleByIdValidation(id);

  console.log(sale);

  if (sale.err) response.status(NOT_FOUND).json(sale);

  response.status(OK).json(sale);
}));

salesController.get('/', rescue(async (_request, response) => {
  const sales = await getSaleValidation();
  response.status(OK).json({ sales });
}));



module.exports = {
  salesController,
};
