const { Router } = require('express');
const Products = require('../models/Products');
// const rescue = require('express-rescue');
const validateProducts = require('../middlewares/ProductsValidations');

const ProductsController = new Router();
const status1 = 201;
const status0 = 200;

ProductsController.post('/',
  validateProducts.validateName,
  validateProducts.validateQuantity,
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

ProductsController.get('/:id', validateProducts.validateId, async (request, response) => {
  const { id } = request.params;

  const product = await Products.findById(id);

  return response.status(status0).json(product);
});

ProductsController.put('/:id',
  validateProducts.validateQuantity,
  validateProducts.validateName,
  async (request, response) => {
    const { id } = request.params;
    const { name, quantity } = request.body;

    await Products.updateProduct(id, name, quantity);

    return response.status(status0).json({ _id: id, name, quantity });
  }
);

ProductsController.delete('/:id',
  validateProducts.validateId,
  async (request, response) => {
    const { id } = request.params;

    const product = await Products.findById(id);
    await Products.deleteProduct(id);

    return response.status(status0).json(product);
  }
);

module.exports = ProductsController;
