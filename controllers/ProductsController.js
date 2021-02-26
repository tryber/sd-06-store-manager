const { Router } = require('express');
const productsRouter = new Router();

const { validateProduct,
  checkIfNotExist,
  registerProduct,
  getAllProducts,
  getProductById,
  validateId,
  editProduct,
} = require('../services/ProductsServices');

const SUCCESS = 200;
const CREATED = 201;

productsRouter.post('/', validateProduct, checkIfNotExist, async (request, response) => {
  await registerProduct(request.body);
  return response.status(CREATED).json(request.body);
});

productsRouter.get('/', async (request, response) => {
  const productList = await getAllProducts();
  response.status(SUCCESS).json({ products: productList });
});

productsRouter.get('/:id', validateId, async (request, response) => {
  const product = await getProductById(request.params.id);
  response.status(SUCCESS).json(product);
});

productsRouter.put('/:id', validateId, validateProduct, async (request, response) => {
  const id = request.params.id;
  const { name, quantity } = request.body;
  await editProduct(id, name, quantity);
  const editedProduct = await getProductById(id);
  return response.status(SUCCESS).json(editedProduct);
});

module.exports = productsRouter;