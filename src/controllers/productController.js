const express = require('express');

const routes = express.Router();

const productServices = require('../services/productService');

routes.post('/', productServices.createProductService);

routes.get('/' , productServices.getAllProductsService);

routes.get('/:id', productServices.getProductByIdService);

module.exports = routes;
