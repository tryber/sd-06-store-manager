const express = require('express');
const productsRoutes = require('./productsRoutes');

const routes = express.Router();

routes.use('/products', productsRoutes);

module.exports = routes;
