const express = require('express');
const ProductsModel = require('../models/ProductsModel');
const validateProducts = require('../utils/validateProducts');

const productsRouter = express.Router();

const SUCCESS = 200;
const CREATED = 201;


productsRouter.get('/', async (_req, res) => {
  const getProducts = await ProductsModel.getAll();
  res.status(SUCCESS).json(getProducts);
});

productsRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  validateProducts(res, name, quantity);
  const { insertedId } = await ProductsModel.create(name, quantity);
  const newProduct = { id: insertedId, name, quantity };
  res.status(CREATED).json(newProduct);
});

// productsRouter.get('/:id', (req, res) => {
//   const { id } = req.params;
//   res.send(id);
// });

module.exports = productsRouter;