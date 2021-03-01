const express = require('express');
const { 
  createProduct,
  getProducts,
  getById,
  updateProduct,
  deleteProduct
} = require('../controllers/ProductController');

const productsRouter = express.Router();

productsRouter.post('/', createProduct);

productsRouter.get('/', getProducts);

productsRouter.get('/:id', getById);

productsRouter.put('/:id', updateProduct);

productsRouter.delete('/:id', deleteProduct);

module.exports = productsRouter;
