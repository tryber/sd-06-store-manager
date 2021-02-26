const { Router } = require('express');
const { ObjectId } = require('mongodb');
const salesRouter = new Router();

const { registerSale,
  validateSale,
  getAllSales,
  getSaleById,
  validateId,
  updateSale,
} = require('../services/SalesServices');

const SUCCESS = 200;
const NOTFOUND = 404;

salesRouter.post('/', validateSale, async (request, response) =>  {
  const sale = await registerSale(request.body);
  response.status(SUCCESS).json(sale);
});

salesRouter.get('/', async (_request, response) => {
  const salesList = await getAllSales();
  response.status(SUCCESS).json({ sales: salesList });
});

salesRouter.get('/:id', validateId, async (request, response) => {
  const id = request.params.id;
  const sale = await getSaleById(id);
  if (!sale) return response.status(NOTFOUND).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  });
  response.status(SUCCESS).json(sale);
});

salesRouter.put('/:id', validateId, validateSale, async (request, response) => {
  const id = request.params.id;
  const data = request.body;
  await updateSale(id, data);
  const saleUpdated = {
    _id: ObjectId(id),
    itensSold: data,
  };

  response.status(SUCCESS).json(saleUpdated);
});


module.exports = salesRouter;