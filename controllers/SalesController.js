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
    if (!product || item.quantity <= ZERO) return res.status(UNPROCESSABLE_ENTITY)
      .json({ message: 'Wrong product ID or invalid quantity' });
  });
  const { insertedId } = await SalesModel.create({ itensSold });
  return res.status(CREATED).json({ id: insertedId, itensSold });
});

SalesRouter.get('/', async (_req, res) => {
  const sales = await SalesModel.getAll();
  return res.status(OK).json({ sales });
});

SalesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await SalesModel.getById(id);
  if (!sale) return res.status(NOT_FOUND).json({ message: 'Sale not found' });
  return res.status(OK).json(sale);
});

SalesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await SalesModel.getById(id);
  if (!sale) return res.status(NOT_FOUND).json({ message: 'Wrong sale ID format' });
  await SalesModel.delById(sale._id);
  return res.status(UNPROCESSABLE_ENTITY).json(sale);
});

module.exports = SalesRouter;
