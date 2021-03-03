const { Router } = require('express');
const { validateName } = require('../service/productService');

const Product = new Router();
const SUCCESS = 200;

Product.get('/', async (req, res) => {
  res.status(SUCCESS).send('products');
});

Product.post('/', validateName, async (req, res) => {
  const product = { ...req.body, role:'product' };

  await createProduct(product);
  return res.status(SUCCESS).json({ product });
});

module.exports = { Product };
