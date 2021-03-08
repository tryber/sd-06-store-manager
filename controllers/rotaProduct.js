const express = require('express');
// const status422 = 422;
const status201 = 201;
const status200 = 200;

const {
  validateNameGreater5,
  validateProductAlredyExist,
  validateQuantityGreaterEqual0,
  validateQuantityNotString,
  validateIdExists
} = require('../services/middlewares');
const {
  createProduct,
  findProductByName,
  findProductById,
  getAll
} = require('../models/querys');

const productRouter = express.Router();

productRouter.post('/',validateNameGreater5, validateQuantityGreaterEqual0,
  validateQuantityNotString, validateProductAlredyExist, async (req, res) => {
    const { name, quantity } = req.body;
    await createProduct(name, quantity);
    const produto = await findProductByName(name);
    return res.status(status201).json(produto[0]);
  });

productRouter.get('/', async (_req, res) => {
  const produtos = await getAll();
  return res.status(status200).json({ products: produtos });
});

productRouter.get('/:id', validateIdExists, async (req, res) => {
  const { id } = req.params;
  const obj = await findProductById(id);
  return res.status(status200).json(obj[0]);
});

module.exports = productRouter;
