const { Router } = require('express');
const { 
  createValidation, 
  getValidation, 
  getByIdValidation,
  editValidation,
  deleteValidation
} = require('../services/ProductsService');

const ProductsController = new Router();

// const STATUS_OK = 200;
// const STATUS_CREATED = 201;
// const STATUS_UNPROCESSABLE= 422;

// Requisito 1
ProductsController.post('/', async (req, res) => {
  const { name, quantity} = req.body;  
  const { err, code, create } = await createValidation(name, quantity);
  
  if (!create) res.status(code).json({ err });
  return res.status(code).json(create);
});

// Requisito 2
ProductsController.get('/', async (_req, res) => {
  const { code, getAll } = await getValidation();
  return res.status(code).json({products: getAll});
});

ProductsController.get('/:id', async (req, res) => {
  const id = req.params.id;
  const { code, err, getById } = await getByIdValidation(id);
  if (!getById) res.status(code).json({err});
  return res.status(code).json(getById);
});

// Requisito 3
ProductsController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {name, quantity} = req.body;
  const { err, code, update} = await editValidation(id, name, quantity);

  if (!update) res.status(code).json({err});
  return res.status(code).json(update);
});

// Requisito 4
ProductsController.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const {err, code, exclude} = await deleteValidation(id);

  if (!exclude) return res.status(code).json({err});
  return res.status(code).json(exclude);
});

module.exports = ProductsController;