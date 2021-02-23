const { Router } = require('express');
const ProductService = require('../services/ProductsService');

const ProductsControllerRouter = Router();
const SC_OK = 200;
const SC_NO_CONTENT = 204;
const SC_NOT_FOUND = 404;

ProductsControllerRouter.get('/', async (_req, res) => {
  const products = await ProductService.getAll();
  res.status(SC_OK).json(products);
});

ProductsControllerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const products = await ProductService.findById(id);

  if (!products) return res.status(SC_NOT_FOUND).json({message: 'products not found'});

  res.status(SC_OK).json(products);
});

ProductsControllerRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const products = await ProductService.create(name, quantity);
  
  res.status(SC_OK).json(products);
});

ProductsControllerRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  await ProductService.update(id, name, quantity);

  res.status(SC_NO_CONTENT).end();
});

ProductsControllerRouter.delete('/:id', async(req, res) => {
  const { id } = req.params;

  await ProductService.remove(id);

  res.status(SC_NO_CONTENT).end();
});

module.exports = ProductsControllerRouter;
