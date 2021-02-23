const { Router } = require('express');
// const productsModel = require('../models/productsModel');
const Product = require('../services/productsServices');

const productsRouter = new Router();

const SUCCESS = 200;
const CREATED = 201;

productsRouter.get('/', async (_req, res) => {
  const products = await Product.getAll();
  res.status(SUCCESS).json(products);
});

productsRouter.post('/', Product.validate, async (req, res) => {
  await Product.create(req.body);
  res.status(CREATED).json(req.body);
});

productsRouter.get('/:id',async (req, res) => {
  const { id } = req.params;
  const product = await Product.getById(id);
  if(!product) return res.status(ERR).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id Format'
    }
  });
  return res.status(SUCCESS).json(product);
});

module.exports = productsRouter;