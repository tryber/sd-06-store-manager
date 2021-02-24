const { Router } = require('express');
const rescue = require('express-rescue');
const ProductService = require('../services/ProductService');
const router = Router();

const CREATED = 201;
const SUCCESS = 200;

router.post('/', rescue(async (req, res) => {
  const product = await ProductService.insertProduct(req.body);

  return res.status(CREATED).json(product);
}));

router.get('/', async (req, res) => {
  const all = await ProductService.getAll();
  res.status(SUCCESS).json({ products: all });
});

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.findById(id);

  if (product.err) return res.status(product.statuscode).json({ err: product.err });
  return res.status(SUCCESS).json(product);
}));

router.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await ProductService.updateProduct(id, name, quantity);

  return res.status(SUCCESS).json({ _id: id, name, quantity });
}));

router.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.deleteProduct(id);

  return res.status(SUCCESS).json(product);
}));

router.use((err, _req, res, next) => {
  res.status(err.statuscode).json({ err: err.message });
});

module.exports = router;
