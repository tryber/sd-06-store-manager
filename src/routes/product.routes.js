const { Router } = require('express');

const ProductController = require('../controllers/ProductController');
const productDataValidator = require('../middlewares/validateProductData');

const productController = new ProductController();

const productRoutes = Router();

productRoutes.get('/', productController.list);
productRoutes.get('/:id', productController.show);

productRoutes.post('/', productDataValidator, productController.create);

productRoutes.put('/:id', productDataValidator, productController.update);

productRoutes.delete('/:id', productController.delete);

module.exports = productRoutes;
