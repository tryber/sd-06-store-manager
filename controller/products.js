const { Router } = require('express');

const Product = new Router();

Product.get('/products', async (req, res) => {
  const sucesso = 200;
  res.status(sucesso).send('products');
});

module.exports = { Product };
