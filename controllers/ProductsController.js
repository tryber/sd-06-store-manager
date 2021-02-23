const { Router } = require('express');
const ProductsService = require('../services/ProductsService');

const router = Router();

router.get('/', async (req, res) => {
  const products = await ProductsService.getAll();

  res.status(200).json(products);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await ProductsService.findById(id);

  res.status(200).json(product);
});

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = ProductsService.create(name, quantity);

  res.status(200).json(newProduct);
});

module.exports = router;
