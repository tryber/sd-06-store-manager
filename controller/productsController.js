const { Router } = require('express');
const {
  validateName,
  createNewProduct,
  validateQuantity,
} = require('../service/productService');

const Product = new Router();
const SUCCESS = 200;
const CREATED = 201;

Product.post('/', validateName, validateQuantity, async (req, res) => {
  const product = { ...req.body };

  await createNewProduct(product);
  return res.status(CREATED).json(product);
});

Product.get('/', async (_req, res) => {
  res.status(SUCCESS).send('products');
});

module.exports = { Product };
