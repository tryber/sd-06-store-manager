const { Router } = require('express');
const ProductService = require('../services/ProductService');
const router = Router();

const CREATED = 201;
const SUCCESS = 200;

router.post('/', async (req, res) => {
  const product = await ProductService.insertProduct(req.body);

  if (product.err) return res.status(product.statuscode).json({ err: product.err });
  
  return res.status(CREATED).json(product);
});

router.get('/', async (req, res) => {
  const all = await ProductService.getAll();
  res.status(SUCCESS).json({ products: all });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.findById(id);

  if (product.err) return res.status(product.statuscode).json({ err: product.err });

  return res.status(SUCCESS).json(product);
});

module.exports = router;
