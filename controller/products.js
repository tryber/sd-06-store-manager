const { Router } = require('express');
const productsModules = require('../modules/productsModules');
const { validateProduct } = require('../services');

const productsRouter = new Router();

const statusSucess = 200;
const createSucess = 201;

productsRouter.post('/', validateProduct, async (req, res) => {
  const { name, quantity } = req.body;
  const createdProduct = await productsModules.createProduct({name, quantity});
  return res.status(createSucess).json(createdProduct);
});

productsRouter.get('/', async (_req, res) => {
  const allProducts = await productsModules.getAllProducts();
  res.status(statusSucess).json(allProducts);
});

module.exports = productsRouter;
