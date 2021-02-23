const { Router, request, response } = require('express');
const Products = require('../models/Products');
// const rescue = require('express-rescue');
const validate = require('../middlewares/validations');

const ProductsController = new Router();
const status = 201;

ProductsController.post('/',
  validate.validateName,
  validate.validateQuantity,
  async (request, response) => {
    const { name, quantity } = request.body;
    const { insertedId } = await Products.insertProduct(name, quantity);
    const isertedProduct = {
      _id: insertedId,
      name,
      quantity,
    };
    response.status(status).json(isertedProduct);
  }
);

ProductsController.get('/', async (_request, response) => response.status(status)
  .json(await Products.getAllProducts()));

// const errorFunction = (err, request, response, next) => {

// }

module.exports = ProductsController;
