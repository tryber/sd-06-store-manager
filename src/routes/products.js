const { Router } = require('express');

const ProductsController = require('../controllers/ProductsController');

const validateProduct = require('../middlewares/validateProduct');

const productRouter = Router();

const productsController = new ProductsController();

productRouter.get('/', productsController.list);
productRouter.post('/', validateProduct, productsController.create);

module.exports = productRouter;
