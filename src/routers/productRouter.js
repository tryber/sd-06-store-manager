const { Router } = require('express');
const productController = require('../controllers/productController');
// const {validateRegisterProduct} = require('./validations/validationMiddlewares');

const productRouter = new Router();

productRouter.post('/', productController.createProduct);

// productRouter.get('/', productController.getAll);

// productRouter.get('/:id', productController.getById);

// productRouter.put('/:id', validateRegisterProduct, productController.updateProducts);

// productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;
