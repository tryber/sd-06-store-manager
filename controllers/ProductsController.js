const { Router } = require('express');
const ProductsService = require('../services/ProductsService');

const router = Router();

const STATUS201 = 201;

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductsService.create(name, quantity);

  res.status(STATUS201).json(product);
});

module.exports = router;
