const express = require('express');

const routes = express.Router();

const productServices = require('../services/productService');

routes.post('/', productServices.createProductService);

routes.get('/' , productServices.getAllProductsService);

module.exports = routes;
