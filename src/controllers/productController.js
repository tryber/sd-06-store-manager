const rescue = require('express-rescue');
const productService = require('../services/productService');
const { status, errors } = require('../utils/status');
const { throwError } = require('../utils/errorHandler');
const { response } = require('express');

const createProduct = rescue(async (request, response) => {
  const { body } = request;

  const createdProduct = await productService.createProduct(body);

  response.status(status.created).json(createdProduct);
});

module.exports = {
  createProduct,
};
