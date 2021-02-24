const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const products = express.Router();

products.delete('/:id', controllers.deleteProduct);

products.get('/:id', controllers.getProducts);
products.get('/', controllers.getProducts);

products.post('/', controllers.createProduct);

products.put('/:id', controllers.updateProduct);

products.use(middlewares.handleError);

module.exports = products;
