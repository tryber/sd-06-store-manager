const { Router } = require('express');
const ProductsService = require('../services/ProductsService');

const router = Router();

router.get('/', async (_request, response) => {
  console.log('Controller called');
  response.status(200).send('products');
  const products = await ProductsService.getAll();

});

module.exports = router;
