const { Router } = require('express');

const productRoutes = require('./product.routes');
const salesRoutes = require('./sales.routes');

const appRoutes = Router();

appRoutes.use('/products', productRoutes);
appRoutes.use('/sales', salesRoutes);

module.exports = appRoutes;
