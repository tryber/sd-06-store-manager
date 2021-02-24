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
  const { status, result } = await Service.findById(id);
  if (status === 'NOK') {
    return res.status(UNPROCESSABLE_ENTITY).json(responseError(result));
  }
  res.status(OK).json(result);
});

// Create New Product
ProductsController.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const { status, result } = await Service.create(name, quantity);
  if (status === 'NOK') {
    return res.status(UNPROCESSABLE_ENTITY).json(responseError(result));
  }
  res.status(CREATED).json(result);
});

// Update Product
ProductsController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const { status, result } = await Service.update(id, name, quantity);
  if (status === 'NOK') {
    return res.status(UNPROCESSABLE_ENTITY).json(responseError(result));
  }
  res.status(OK).json(result);
});

// Delete Product
ProductsController.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  const { status, result } = await Service.remove(id);
  if (status === 'NOK') {
    return res.status(UNPROCESSABLE_ENTITY).json(responseError(result));
  }
  res.status(OK).json(result);
});


const responseError = (message) => {
  return { err: { code: 'invalid_data', message } };
};

module.exports = ProductsController;
