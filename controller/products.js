const { Router } = require('express');

const ProductsRouter = new Router();
const {
  getAllProducts,
  createProduct,
  getProductById,
  editProduct,
  deleteProduct
} = require('../modules/productModules');
const {
  validateProduct,
  validateId,
  checkAlreadyExists
} = require('../services/prodServices');

const twoHundred = 200;
const twoHundredOne = 201;
const fourHundredTwentyTwo = 422;

ProductsRouter.post(
  '/products', validateProduct, checkAlreadyExists, async (req, res) => {
    await createProduct(req.body);
    return res.status(twoHundredOne).json(req.body);
  }
);

ProductsRouter.get('/products', async (_req, res) => {
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

ProductsRouter.put('/products/:id', validateId, validateProduct, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await editProduct(id, name, quantity);
  const editedProduct = await getProductById(id);
  return res.status(twoHundred).send(editedProduct);
});

ProductsRouter.delete('/products/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await getProductById(id);
  if (!deletedProduct) return res.status(fourHundredTwentyTwo).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  });
  await deleteProduct(id);
  return res.status(twoHundred).send(deletedProduct);
});

module.exports = { ProductsRouter };