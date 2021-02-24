const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers/sales');

const sales = express.Router();



sales.use(middlewares.handleError);

module.exports = sales;
