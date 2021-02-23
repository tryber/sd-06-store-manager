const { Router } = require('express');
const rescue = require('express-rescue');
const { ProductServices } = require('../services');
const { ProductValidator } = require('../middlewares');

const ProductController = new Router();
const status200 = 200;
const status201 = 201;

ProductController.get('/', rescue( async (_req, res) => {
  const all = await ProductServices.getAll();
  res.status(status200).json({ products: all });
}));

ProductController.get('/:id',
  ProductValidator.productExists,
  rescue( async (req, res) => {
    const { id } = req.params;
    res.status(status200).json(await ProductServices.getById(id));
  })
);

ProductController.post('/',
  ProductValidator.productValidator,
  rescue( async (req, res) => {
    const { name, quantity } = req.body;
    const newProduct = await ProductServices.postProduct({ name, quantity });
    res.status(status201).json(newProduct);
  })
);

module.exports = ProductController;