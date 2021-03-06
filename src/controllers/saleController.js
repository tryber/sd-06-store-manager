const express = require('express');

const routes = express.Router();

const saleServices = require('../services/saleService');

routes.post('/', saleServices.createSaleService);

routes.get('/', saleServices.getAllSalesService);

routes.get('/:id', saleServices.getSaleByIdService);

module.exports = routes;
