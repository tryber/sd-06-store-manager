const { Router } = require('express');
const { 
  createValidation, 
  getValidation, 
  getByIdValidation,
  editValidation,
  deleteValidation
} = require('../services/ProductsService');

const ProductsController = new Router();

const STATUS_OK = 200;
const STATUS_CREATED = 201;

// Requisito 1
ProductsController.post('/', async (req, res) => {
  const { name, quantity} = req.body;
  const register = await createValidation(name, quantity);
  return res.status(STATUS_CREATED).json(register);
});

// Requisito 2
ProductsController.get('/', async (_req, res) => {
  const products = await getValidation();
  return res.status(STATUS_OK).json({products});
});

ProductsController.get('/:id', async (req, res) => {
  const id = req.params.id;
  const product = await getByIdValidation(id);
  return res.status(STATUS_OK).json(product);
});

// Requisito 3
ProductsController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {name, quantity} = req.body;
  const updateProduct = await editValidation(id, name, quantity);
  return res.status(STATUS_OK).json(updateProduct);
});

// Requisito 4
ProductsController.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const deleteProduct = await deleteValidation(id);
  return res.status(STATUS_OK).json(deleteProduct);
});

module.exports = ProductsController;