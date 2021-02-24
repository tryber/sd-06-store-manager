const express = require('express');
const controllers = require('../controllers/products');
const middlewares = require('../middlewares');

const products = express.Router();

products.delete('/:id', controllers.deleteProduct);

products.get('/:id', controllers.getProducts);
products.get('/', controllers.getProducts);

products.post('/', controllers.createProduct);

products.put('/:id', controllers.updateProduct);

products.use(middlewares.handleError);

module.exports = products;
