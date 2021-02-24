const { Router } = require('express');
const rescue = require('express-rescue');
const ProductService = require('../service/ProductService');
const { validateName, validateQuantity } = require('../middlewares/validations');
const statusCodes = require('../dictionary/statusCodes');

const ProductController = new Router();

ProductController.post(
  '/',
  validateName,
  validateQuantity,
  rescue(async (request, response) => {
    const product = request.body;
    const { ops: createdProduct } = await ProductService.createProduct(product);

    response.status(statusCodes.CREATED).json(createdProduct[0]);
  }));

module.exports = ProductController;