const { Router } = require('express');

const Product = new Router();

Product.get('/', async (req, res) => {
  const sucesso = 200;
  res.status(sucesso).send('products');
});

Product.post('/', async (req, res) => {});

module.exports = { Product };
