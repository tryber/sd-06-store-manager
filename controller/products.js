const { Router } = require('express');

const ProductsRouter = new Router();
const {
  getAllProducts,
  createProduct,
  getProductById
} = require('../modules/productModules');
const { validateProduct } = require('../services/prodServices');

const twoHundred = 200;
const twoHundredOne = 201;
const fourHundredTwentyTwo = 422;

ProductsRouter.post('/products', validateProduct, async (req, res) => {
  await createProduct(req.body);
  return res.status(twoHundredOne).json(req.body);
});

ProductsRouter.get('/products', async (req, res) => {
  const allProducts = await getAllProducts();
  return res.status(twoHundred).send(allProducts);
});

ProductsRouter.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const allProducts = await getAllProducts();
  const existId = allProducts.find(product => product.id === id);
  if (existId) {
    return res.status(fourHundredTwentyTwo).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  const productById = await getProductById(id);
  return res.status(twoHundred).send(productById);
});

module.exports = { ProductsRouter };