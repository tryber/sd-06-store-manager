const { Router } = require('express');
const ProductsService = require('../services/ProductsService');
const { validateProduct, validateProductUpdate } =
  require('../middlewares/validateProduct');
const { validateId } = require('../middlewares/validateId');

const router = Router();

const STATUS201 = 201;
const STATUS200 = 200;

router.get('/', async (req, res) => {
  const products = await ProductsService.getAll();

  res.status(STATUS200).json(products);
});

router.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;

  const product = await ProductsService.getById(id);
  

  res.status(STATUS200).json(product);
});

router.post('/',validateProduct, async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductsService.create(name, quantity);

  res.status(STATUS201).json(product);
});

router.put('/:id', validateProductUpdate, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await ProductsService.update(id, name, quantity);

  res.status(STATUS200).json(product);
});

module.exports = router;
