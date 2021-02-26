const { Router } = require('express');
const produtoServices = require('../services/produtoServices');
const {
  verifyNameExists,
  verifyProducts,
  verifyId,
} = require('../services/middleware/verifyValidate');
const produtoController = new Router();
const statusNumberSucess = 201;
const statusSucess = 200;
const statusNumberError = 422;

produtoController.get('/', async (_request, response) => {
  const returnAll = await produtoServices.getAllProduct();
  return response.status(statusSucess).json({ products: returnAll });
});

produtoController.get('/:id', verifyId, async (request, response) => {
  const { id } = request.params;
  const returnIdProduto = await produtoServices.getListId(id);
  if (!returnIdProduto)
    return response
      .status(statusNumberError)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  return response.status(statusSucess).json(returnIdProduto);
});

produtoController.post('/', verifyProducts, verifyNameExists,
  async (request, response) => {
    const { name, quantity } = request.body;
    const createProducts = await produtoServices.createProduct(name, quantity);
    return response.status(statusNumberSucess).json(createProducts);
  });

module.exports = produtoController;
