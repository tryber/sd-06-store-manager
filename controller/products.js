const { Router } = require('express');

const ProductsRouter = new Router();
const {
  getAllProducts,
  createProduct,
  getProductById
} = require('../modules/productModules');
const { validateProduct, validateId } = require('../services/prodServices');

const twoHundred = 200;
const twoHundredOne = 201;
const fourHundredTwentyTwo = 422;

ProductsRouter.post('/products', validateProduct, async (req, res) => {
  await createProduct(req.body);
  return res.status(twoHundredOne).json(req.body);
});

ProductsRouter.get('/products', async (req, res) => {
  const allProducts = await getAllProducts();
  return res.status(twoHundred).send({ products: allProducts});
});

ProductsRouter.get('/products/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const productById = await getProductById(id);
  if (!productById) return res.status(fourHundredTwentyTwo).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  });
  return res.status(twoHundred).send(productById);
});

module.exports = { ProductsRouter };