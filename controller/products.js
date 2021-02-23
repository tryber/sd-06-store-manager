const { Router } = require('express');
const productsModules = require('../modules/productsModules');

const productsRouter = new Router();

const statusSucess = 200;

productsRouter.get('/', async (_req, res) => {
  const allProducts = await productsModules.getAllProducts();
  res.status(statusSucess).json(allProducts);
});

productsRouter.post('/', async (req, res) => {
  await productsModules.createProduct(req.body);
  res.status(statusSucess).json(req.body);
});

module.exports = productsRouter;
