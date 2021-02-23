const { Router } = require('express');
const rescue = require('express-rescue');
const { ProductServices } = require('../services');
const { ProductValidator } = require('../middlewares');

const ProductController = new Router();
const status200 = 200;
const status201 = 201;

ProductController.get('/', rescue( async (_req, res) => {
  res.status(status200).json(await ProductServices.getAll());
}));

ProductController.post('/',
  ProductValidator.productValidator,
  rescue( async (req, res) => {
    const { name, quantity } = req.body;
    const newProduct = await ProductServices.postProduct({ name, quantity });
    res.status(status201).json(newProduct);
  })
);

module.exports = ProductController;