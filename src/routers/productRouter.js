const { Router } = require('express');
const productController = require('../controllers/productController');
const { validateCreateProduct } = require('../utils/validationErrors');

const productRouter = new Router();

productRouter.post('/', validateCreateProduct, productController.createProduct);

// productRouter.get('/', productController.getAll);

// productRouter.get('/:id', productController.getById);

// productRouter.put('/:id', validateRegisterProduct, productController.updateProducts);

// productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;
