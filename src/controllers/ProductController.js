const { Router } = require('express');
const ProductService = require('../services/ProductService');

const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLEENTITY = 422;

const ProductController = new Router();

ProductController.get('/', async (req, res) => {
  res.status(SUCCESS).json(await ProductService.getAllProducts());
});

ProductController.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductService.createProduct(name, quantity);
  if (product.message) return res.status(UNPROCESSABLEENTITY).json(
    { err: {
      code: 'invalid_data',
      message: product.message
    }}
  );
  res.status(CREATED).json(product);
});

module.exports = ProductController;
