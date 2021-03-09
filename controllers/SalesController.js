const SalesModel = require('../models/SalesModel');
const ProductsModel = require('../models/ProductsModel');
const { Router } = require('express');

const SalesRouter = Router();
const OK = 200, CREATED = 201 , NOT_FOUND = 404, UNPROCESSABLE_ENTITY = 422;
const ZERO = 0;

SalesRouter.post('/', async (req, res) => {
  const itensSold = req.body;
  itensSold.forEach(async (item) => {
    const product = await ProductsModel.getById(item.productId);
    if (!product || item.quantity <= ZERO || typeof item.quantity !== 'number') {
      const errorInfo = {
        message: 'Wrong product ID or invalid quantity',
        code: 'invalid_data'
      };
      return res.status(UNPROCESSABLE_ENTITY)
        .json({ err: errorInfo });
    }
  });
  const { id } = await SalesModel.create({ itensSold });
  return res.status(OK).json({ id, itensSold });
});

SalesRouter.get('/', async (_req, res) => {
  const sales = await SalesModel.getAll();
  return res.status(OK).json({ sales });
});

SalesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await SalesModel.getById(id);
  if (!sale) {
    const errorInfo = {
      message: 'Sale not found',
      code: 'not_found'
    };
    return res.status(NOT_FOUND).json({ err: errorInfo });
  }
  return res.status(OK).json(sale);
});

SalesRouter.post('/:id', async (req, res) => {
  const itensSold = req.body;
  const id = req.params;
  itensSold.forEach(async (i) => {
    const product = await ProductsModel.getById(i.productId);
    if (!product || i.quantity <= ZERO || typeof i.quantity !== 'number') {
      const errorInfo = {
        message: 'Wrong product ID or invalid quantity',
        code: 'invalid_data'
      };
      return res.status(UNPROCESSABLE_ENTITY)
        .json({ err: errorInfo });
    }
  });
  await SalesModel.update({ id, itensSold });
  return res.status(OK).json({ id, itensSold });
});

SalesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await SalesModel.getById(id);
  if (!sale) {
    const errorInfo = {
      message: 'Wrong sale ID format',
      code: 'invalid_data'
    };
    return res.status(NOT_FOUND).json({ err: errorInfo });
  }
  await SalesModel.delById(sale._id);
  return res.status(UNPROCESSABLE_ENTITY).json(sale);
});

module.exports = SalesRouter;
