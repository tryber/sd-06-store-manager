const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const products = express.Router();

products.post('/',
  middlewares.validateProduct,
  middlewares.checkNameAvailability,
  controllers.createProduct
);

products.use(middlewares.handleError);

module.exports = products;
