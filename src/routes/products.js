const { Router } = require('express');

const ProductsController = require('../controllers/ProductsController');

const validateProduct = require('../middlewares/validateProduct');

const productRouter = Router();

const productsController = new ProductsController();

productRouter.get('/', productsController.list);
productRouter.get('/:id', productsController.show);
productRouter.post('/', validateProduct, productsController.create);
productRouter.put('/:id', validateProduct, productsController.update);

module.exports = productRouter;
