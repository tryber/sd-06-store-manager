const { Router } = require('express');
const { ObjectId } = require('mongodb');
const salesRouter = new Router();
const { addSales,
  validateSales,
  allSales,
  saleById,
  checkId,
  updateSale,
  deleteSale
} = require('../services/salesService');

const HTTP201 = 201;
const HTTP200 = 200;


salesRouter.post('/', validateSales, async (request, response) =>  {
  const sale = await addSales(request.body);
  response.status(HTTP200).json(sale);
});

module.exports = salesRouter;
