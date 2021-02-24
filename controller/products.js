const { Router } = require('express');
const productsModules = require('../modules/productsModules');
const { validateProduct } = require('../services');

const productsRouter = new Router();

const statusSucess = 200;
const createSucess = 201;

productsRouter.post('/', validateProduct, async (req, res) => {
  await productsModules.createProduct(req.body);
  res.status(createSucess).json(req.body);
});

productsRouter.get('/', async (_req, res) => {
  const allProducts = await productsModules.getAllProducts();
  res.status(statusSucess).json(allProducts);
});

productsRouter.get('/:id', async (_req, res) => {
  const id = parseInt(req.params, 10);
  const allProducts = await productsModules.getAllProducts();
  const productFound = allProducts.find((product) => product.id === id);
  
  res.status(statusSucess).json(productFound);
});

module.exports = productsRouter;
