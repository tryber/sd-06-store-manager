const express = require('express');
const {
  saveProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.post('/', saveProduct);

productsRouter.get('/', getProducts);

productsRouter.get('/:id', getProductById);

productsRouter.put('/:id', updateProduct);

productsRouter.delete('/:id', deleteProduct);

module.exports = productsRouter;
