const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const products = express.Router();

products.get('/:id', controllers.getProducts);
products.get('/', controllers.getProducts);

products.post('/', controllers.createProduct);

products.use(middlewares.handleError);

module.exports = products;
