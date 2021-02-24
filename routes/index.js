const express = require('express');
const productsRoutes = require('./productsRoutes');
const salesRoutes = require('./salesRoutes');

const routes = express.Router();

routes.use('/products', productsRoutes);
routes.use('/sales', salesRoutes);

module.exports = routes;
