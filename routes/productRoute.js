const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const products = express.Router();

products.post('/', controllers.createProduct);

products.use(middlewares.handleError);

module.exports = products;
