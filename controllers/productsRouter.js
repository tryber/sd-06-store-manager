const express = require('express');
const {
  saveProduct,
} = require('../models/productsModel');

const productsRouter = express.Router();

productsRouter.post('/', saveProduct);

module.exports = productsRouter;
