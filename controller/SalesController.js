const express = require('express');

const routes = express.Router();

const SalesService = require('../service/SalesServices');

routes.post('/', SalesService.creatingValidSale);

routes.get('/', SalesService.displayingAllSales);

routes.get('/:id', SalesService.displayThisSpecificSale);

routes.put('/:id', SalesService.updatingValidSale);

routes.delete('/:id', SalesService.removingValidSale);

module.exports = routes;
