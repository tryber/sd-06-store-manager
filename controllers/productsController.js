const express = require('express');

const productsRouter = express.Router();
const productsService = require('../services/productsService');

const SUCCESS = 200;
const CREATED = 201;

productsRouter.get('/', async (_request, response) => {
  const products = await productsService.getAll();
  return response.status(SUCCESS).json(products);
});

productsRouter.post('/', async (request, response) => {
  const { name, quantity } = request.body;

  const product = await productsService.create(name, quantity);

  return response.status(CREATED).json(product);
});

productsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, quantity } = request.body;
  const product = await productsService.update(id, name, quantity);
  
  return response.status(SUCCESS).json(product);
});

productsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const product = await productsService.findById(id);
  return response.status(SUCCESS).json(product);
});

productsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const product = await productsService.findById(id);
  await productsService.remove(id);
  return response.status(SUCCESS).json(product);
});

module.exports = productsRouter;