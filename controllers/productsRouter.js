const express = require('express');
const {
  saveProduct,
  getProducts,
  getProductById,
} = require('../models/productsModel');

const productsRouter = express.Router();

productsRouter.post('/', saveProduct);

productsRouter.get('/', getProducts);

productsRouter.get('/:id', getProductById);

module.exports = productsRouter;
