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
const HTTP404 = 404;

salesRouter.post('/', validateSales, async (request, response) =>  {
  const sale = await addSales(request.body);
  response.status(HTTP200).json(sale);
});


salesRouter.get('/', async (_request, response) => {
  const salesList = await getAllSales();
  response.status(HTTP200).json({ sales: salesList });
});

salesRouter.get('/:id', checkId, async (request, response) => {
  const id = request.params.id;
  const sales = await saleById(id);
  if (!sales) return response.status(HTTP404).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  });
  response.status(HTTP200).json(sales);
});


module.exports = salesRouter;
