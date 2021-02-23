const { Router } = require('express');
const Service = require('../service/ProductsService');

const ProductsController = new Router();
const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;


ProductsController.get('/', async (req, res) => {
  const products = await Service.getAll();
  res.status(OK).json(products);
});

ProductsController.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const result = await Service.create(name, quantity);
  console.log('result', result);
  const { status } = result;
  if (status === 'NOK') {
    const { message } = result;
    const error = { err: { code: 'invalid_data', message } };
    return res.status(UNPROCESSABLE_ENTITY).json(error);  
  }
  const { product } = result;
  res.status(CREATED).json(product);
});

module.exports = ProductsController;
