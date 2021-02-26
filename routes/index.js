const { Router } = require('express');

const handleError = require('../middlewares/handleError');
const productRoutes = require('./productsRoutes');
const salesRoutes = require('./salesRoutes');

const appRoutes = Router();

appRoutes.use('/products', productRoutes);
appRoutes.use('/sales', salesRoutes);

appRoutes.use(handleError);

module.exports = appRoutes;
