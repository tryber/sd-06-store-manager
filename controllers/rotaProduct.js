const express = require('express');
// const status422 = 422;
const status201 = 201;
const {
  validateNameGreater5,
  validateProductAlredyExist,
  validateQuantityGreaterEqual0,
  validateQuantityNotString
} = require('../services/middlewares');
const {
  createProduct,
  findProductByName
} = require('../models/querys');

const productRouter = express.Router();

productRouter.post('/',validateNameGreater5, validateQuantityGreaterEqual0,
  validateQuantityNotString, validateProductAlredyExist, async (req, res) => {
    const { name, quantity } = req.body;
    await createProduct(name, quantity);
    const produto = await findProductByName(name);
    return res.status(status201).json(produto);
  });

module.exports = productRouter;
