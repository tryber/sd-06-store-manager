const { Router } = require('express');
const rescue = require('express-rescue');
const ProductService = require('../service/ProductService');
const {
  validateName,
  validateProductExistence,
  validateQuantity
} = require('../middlewares/validations');
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

ProductController.get(
  '/:id',
  validateProductExistence,
  rescue(async (request, response) => {
    const { id } = request.params;
    const foundProduct = await ProductService.findProductById(id);

    response.status(statusCodes.OK).json(foundProduct);
  }));

ProductController.get('/', rescue(async (request, response) => {
  const products = await ProductService.findAllProducts();

  response.status(statusCodes.OK).json({ products });
}));

ProductController.put(
  '/:id',
  validateName,
  validateQuantity,
  rescue(async (request, response) => {
    const product = request.body;
    const { id } = request.params;
    product['_id'] = id;

    await ProductService.updateProduct(product);
    // console.log("updatedProduct", updatedProduct)

    response.status(statusCodes.OK).json(product);
  }));

module.exports = ProductController;