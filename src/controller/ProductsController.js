const { Router, response } = require('express');
const Service = require('../service/ProductsService');

const ProductsController = new Router();
const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

// Get All Products
ProductsController.get('/', async (req, res) => {
  const products = await Service.getAll();
  res.status(OK).json({products: products});
});

// Find Product by ID
ProductsController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Service.findById(id);
  const { status } = result;
  if (status === 'NOK') {
    return res.status(UNPROCESSABLE_ENTITY).json(responseError(result));
  }
  const { product } = result;
  res.status(OK).json(product);
});

// Create New Product
ProductsController.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const result = await Service.create(name, quantity);
  const { status } = result;
  if (status === 'NOK') {
    return res.status(UNPROCESSABLE_ENTITY).json(responseError(result));
  }
  const { product } = result;
  res.status(CREATED).json(product);
});

// Update Product
ProductsController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const result = await Service.update(id, name, quantity);
  const { status } = result;
  if (status === 'NOK') {
    return res.status(UNPROCESSABLE_ENTITY).json(responseError(result));
  }
  const { product } = result;
  res.status(OK).json(product);
});


const responseError = (error) => {
  const { message } = error;
  return { err: { code: 'invalid_data', message } };
};

module.exports = ProductsController;
