const { Router } = require('express');
const { createProduct, ProductList, findById } = require('../service/productService');

const productController = new Router();
const { ObjectId } = require('mongodb');
const { validateCreate, rightId } = require('../middleware/storeMiddleware');


productController.get('/', async (_req, res) => {
  const list = await ProductList();
  const okay = 200;
  res.status(okay).json({ products: list });
});

productController.get('/:id', rightId, async (req, res) => {
  const { id } = req.params;
  const okay = 200;
  const productById = await findById(id);

  res.status(okay).json(productById);
});

productController.post('/', validateCreate, async (req, res) => {
  const deBoa = 201;
  const product = req.body;
  const { ops } = await createProduct(product);

  res.status(deBoa).json(ops[0]);
});

module.exports = productController;