const express = require('express');

const routes = express.Router();

const saleServices = require('../services/saleService');

routes.post('/', saleServices.createSaleService);

module.exports = routes;
