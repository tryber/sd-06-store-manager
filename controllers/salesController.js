const { Router } = require('express');
const { ObjectId } = require('mongodb');
const salesRouter = new Router();
const { 
  addSales,
  validateSales,
  allSales,
  salesById,
  checkId,
  updateSales
} = require('../services/salesService');

const HTTP200 = 200;
const HTTP404 = 404;

salesRouter.post('/', validateSales, async (request, response) =>  {
  const sale = await addSales(request.body);
  response.status(HTTP200).json(sale);
});


salesRouter.get('/', async (_request, response) => {
  const salesList = await allSales();
  response.status(HTTP200).json({ sales: salesList });
});

salesRouter.get('/:id', checkId, async (request, response) => {
  const id = request.params.id;
  const sales = await salesById(id);
  if (!sales) return response.status(HTTP404).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  });
  response.status(HTTP200).json(sales);
});

salesRouter.put('/:id', checkId, validateSales, async (request, response) => {
  const id = request.params.id;
  const data = request.body;
  await updateSales(id, data);
  const updatedSales = {
    _id: ObjectId(id),
    itensSold: data,
  };

  response.status(HTTP200).json(updatedSales);
});

module.exports = salesRouter;
