const { Router } = require('express');
const produtoServices = require('../services/produtoServices');
const {
  verifyNameExists,
  verifyProducts,
  validateIdProduct,
} = require('../services/middleware/verifyValidate');

const produtoController = new Router();
const statusNumberSucess = 201;
const statusSucess = 200;
const statusNumberError = 422;

produtoController.get('/', async (_request, response) => {
  const returnAll = await produtoServices.getAllProduct();
  return response.status(statusSucess).json({ products: returnAll });
});

produtoController.get('/:id', validateIdProduct, async (request, response) => {
  const { id } = request.params;
  const returnIdProduto = await produtoServices.getListId(id);
  if (!returnIdProduto)
    return response
      .status(statusNumberError)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  return response.status(statusSucess).json(returnIdProduto);
});

produtoController.delete('/:id', validateIdProduct, async(request, response) => {
  const { id } = request.params;
  const { name, quantity } = request.body;
  const productDel = {
    _id: id,
    name,
    quantity,
  };
  productDeleted = await produtoServices.deleteOneProduct(id);
  return response.status(statusSucess).json(productDel);
});

produtoController.put('/:id', validateIdProduct,
  verifyProducts,
  async (request, response) => {
    const { id } = request.params;
    const { name, quantity } = request.body;

    const productEdit = {
      _id: id,
      name,
      quantity,
    };
    const returnEditProduct = await produtoServices.putEditListId(id, name, quantity);
    return response.status(statusSucess).json(productEdit);
  });

produtoController.post('/', verifyProducts,
  verifyNameExists, async (request, response) => {
    const { name, quantity } = request.body;
    const createProducts = await produtoServices.createProduct(name, quantity);
    return response.status(statusNumberSucess).json(createProducts);
  });

module.exports = produtoController;
