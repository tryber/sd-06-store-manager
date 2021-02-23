const { Router } = require('express');

const ProductsRouter = new Router();
const { getAllProducts, createProduct } = require('../modules/productModules');
const { validateProduct } = require('../services/prodServices');

const twoHundredOne = 201;

ProductsRouter.get('/products', async (req, res) => {
  const allProducts = await getAllProducts();
  res.status(twoHundred).send(allProducts);
});

ProductsRouter.post('/products', validateProduct, async (req, res) => {
  await createProduct(req.body);
  res.status(twoHundredOne).json(req.body);
});

module.exports = { ProductsRouter };