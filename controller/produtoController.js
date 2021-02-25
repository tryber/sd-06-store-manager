const { Router } = require('express');
const produtoServices  = require('../services/produtoServices');
const{
  verifyNameExists,
  verifyProducts
} =require('../services/middleware/verifyValidate');
const produtoController = new Router();
const statusNumberSucess = 201;

produtoController.get('/', async (_request, response) => {
  const returnAll = await produtoServices.getAllProduct();
  return response.status(statusNumberSucess).json({ products: returnAll });
});

produtoController.post('/', verifyProducts, verifyNameExists,
  async (request, response) => {
    const { name, quantity } = request.body;
    const createProducts = await produtoServices.createProduct(name, quantity);
    return response.status(statusNumberSucess)
      .json(createProducts);
  });

module.exports = produtoController;
