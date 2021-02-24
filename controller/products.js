const { Router } = require('express');
const productsModules = require('../modules/productsModules');
const { validateProduct } = require('../services');

const productsRouter = new Router();

const findSucess = 200;
const createSucess = 201;

productsRouter.post('/', validateProduct, async (req, res) => {
  await productsModules.createProduct(req.body);
  res.status(createSucess).json(req.body);
});

productsRouter.get('/', async (_req, res) => {
  const allProducts = await productsModules.getAllProducts();
  res.status(findSucess).json(allProducts);
});

productsRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params, 10);
  
  const productFound = productsModules.getProductById(id);
  
  res.status(findSucess).json(productFound);
});

module.exports = productsRouter;
