const express = require('express');
const productsRoutes = require('./productsRoutes');
const salesRoutes = require('./salesRoutes');
const handleError = require('../middlewares/handleError');

const routes = express.Router();

routes.use('/products', productsRoutes);
routes.use('/sales', salesRoutes);
routes.use(handleError);

module.exports = routes;
