const { Router, request, response } = require('express');
const Products = require('../models/Products');
// const rescue = require('express-rescue');
const validate = require('../middlewares/validations');

const ProductsController = new Router();
const status1 = 201;
const status0 = 200;

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
    response.status(status1).json(isertedProduct);
  }
);

ProductsController.get('/', async (_request, response) => {
  const allProducts = await Products.getAllProducts();
  return response.status(status0).json({ products: allProducts });
});

ProductsController.get('/:id', validate.validateId, async (request, response) => {
  const { id } = request.params;

  const product = await Products.findById(id);
  return response.status(status0).json(product);
});

ProductsController.put('/:id',
  validate.validateQuantity,
  validate.validateName,
  async (request, response) => {
    const { id } = request.params;
    const { name, quantity } = request.body;

    await Products.updateProduct(id, name, quantity);

    return response.status(status0).json({ _id: id, name, quantity });
  }
);

// const errorFunction = (err, request, response, next) => {

// }

module.exports = ProductsController;
