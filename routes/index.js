const express = require('express');
const productsRoute = require('./productRoute');

const routes = express.Router();

routes.use('/products', productsRoute);

module.exports = routes;
