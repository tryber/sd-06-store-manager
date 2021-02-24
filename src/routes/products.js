const { Router } = require('express');

const ProductsController = require('../controllers/ProductsController');

const productRouter = Router();

const productsController = new ProductsController();

productRouter.get('/', productsController.list);

module.exports = productRouter;
