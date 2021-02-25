const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers/sales');

const sales = express.Router();

sales.get('/:id', controllers.getSales);
sales.get('/', controllers.getSales);

sales.post('/', controllers.createSale);

sales.put('/:id', controllers.updateSale);

sales.use(middlewares.handleError);

module.exports = sales;
