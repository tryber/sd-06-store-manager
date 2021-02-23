const { Router } = require('express');

const ProductsRouter = new Router();
const { getAllProducts, createProduct, getProductById } = require('../modules/productModules');
const { validateProduct } = require('../services/prodServices');

const twoHundred = 200;
const twoHundredOne = 201;

ProductsRouter.post('/products', validateProduct, async (req, res) => {
  await createProduct(req.body);
  res.status(twoHundredOne).json(req.body);
});

ProductsRouter.get('/products', async (req, res) => {
  const allProducts = await getAllProducts();
  res.status(twoHundred).send(allProducts);
});

ProductsRouter.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const productById = await getProductById(id);
  res.status(twoHundred).send(productById);
});

module.exports = { ProductsRouter };