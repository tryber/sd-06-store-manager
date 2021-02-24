const { Router } = require('express');
const { ObjectId } = require('mongodb');
const Product = require('../services/productsServices');

const productsRouter = new Router();

const SUCCESS = 200;
const CREATED = 201;
const ERR = 422;

productsRouter.get('/', async (_req, res) => {
  const products = await Product.getAll();
  res.status(SUCCESS).json({ products });
});

productsRouter.post('/', Product.validate, Product.usedAlready, async (req, res) => {
  await Product.create(req.body);
  res.status(CREATED).json(req.body);
});

productsRouter.get('/:id', Product.idValidation, async (req, res) => {
  const { id } = req.params;
  const product = await Product.getById(id);
  if(!product) return res.status(ERR).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  });
  return res.status(SUCCESS).json(product);
});

productsRouter.put('/:id', Product.validate, async (req, res) => {
  const { id } = req.params;
  await Product.update(id, req.body);
  const product = await Product.getById(id);
  res.status(SUCCESS).json(product);
});

// productsRouter.delete('/:id', (req, res) => {
//   const { id } = req.params;
//   const product = await Product.getById(id);
//   if(!product) return res.status(ERR).json({
//     err: {
//       code: 'invalid_data',
//       message: 'Wrong id format'
//     }
//   });
//   await Product.remove(id)
//   return res.status(SUCCESS).json(product);
// });

module.exports = productsRouter;