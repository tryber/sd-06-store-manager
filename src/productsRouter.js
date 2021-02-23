const { Router } = require('express');
const ProductController = require('./controllers/ProductsController');
const {validateRegisterProduct} = require('./validations/validationMiddlewares');

const ProductsRouter = new Router();

ProductsRouter.post('/', validateRegisterProduct, ProductController.registerProduct);

ProductsRouter.get('/', ProductController.getAll);

ProductsRouter.get('/:id', ProductController.getById);

module.exports = ProductsRouter;