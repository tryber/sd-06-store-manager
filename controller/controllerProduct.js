const { Router } = require('express');
const { ObjectId } = require('mongodb');
const rescue = require('express-rescue');
const products = require('../models/products');
const routerProducts = Router();
const verifyProduct = require('../middleware/products');
const status201 = 201;
const status200 = 200;
const status500 = 500;
const status422 = 422;

routerProducts.post('/', verifyProduct, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const product = await products.createProduct(name, quantity);

  return res.status(status201).json(product);
}));

routerProducts.get('/', async (req, res) => {
  try {
    const allProducts = await products.getAllProducts();
    return res.status(status200).json({ products: allProducts});
  } catch {
    return res.status(status500).json({ message: 'Try Again'});
  }
});

routerProducts.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await products.getProductById(id, res);
    return res.status(status200).json(product);
  } catch {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
});

module.exports = routerProducts;
