const express = require('express');
const rescue = require('express-rescue');

const { productsModel } = require('../models/index');
const { productService } = require('../service/index');
const { validation } = require('../middlewares/validateProducts');

const productsController = express.Router();

const UNPROCESABLE_ENTITY = 422;
const OK = 200;
const CREATED = 201;

productsController.delete('/:id', rescue(async (request, response) => {
  const { id } = request.params;

  const product = await productService.validationToDeleteProduct(id);
  if (product.err) return response.status(UNPROCESABLE_ENTITY).json(product);

  response.status(OK).json(product);
}));

productsController.put('/:id', validation, rescue(async (request, response) => {
  const { id } = request.params;
  const { name, quantity } = request.body;

  const result = await productsModel.updateProduct(id, name, quantity);

  response.status(OK).json(result);
}));

productsController.post('/', validation, rescue(async (request, response) => {
  const { name, quantity } = request.body;
  const result = await productService.validateProduct(name, quantity);

  if (result.err) return response.status(UNPROCESABLE_ENTITY).json(result);

  response.status(CREATED).json(result);
}));

productsController.get('/:id', rescue(async (request, response) => {
  const { id } = request.params;
  const product = await productService.validateProductId(id);

  if (product.err) return response.status(UNPROCESABLE_ENTITY).json(product);

  response.status(OK).send(product);
}));

productsController.get('/', rescue(async (_request, response) => {
  const products = await productsModel.getProducts();

  response.status(OK).json({ products });
}));

module.exports = {
  productsController,
};
