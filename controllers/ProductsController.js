const { Router } = require('express');
const productsRouter = new Router();

const { validateProduct,
  checkIfNotExist,
  registerProduct,
} = require('../services/ProductsServices');

const SUCCESS = 201;

productsRouter.post('/', validateProduct, checkIfNotExist, async (request, response) => {
  await registerProduct(request.body);
  return response.status(SUCCESS).json(request.body);
});

module.exports = { productsRouter };