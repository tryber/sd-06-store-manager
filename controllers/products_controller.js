const { Router } = require('express');
const productsService = require('../services/products_service');

const router = Router();

const OK = 200;
const Created = 201;
const UnprocessableEntity = 422;

router.get('/', async (_req, res) => {
  const items = await productsService.getAllProducts();

  res.status(OK).json(items);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await productsService.findByIdProducts(id);

    res.status(OK).json(item);
  } catch (e) {
    if (e.err.code === 'invalid_data') {
      res.status(UnprocessableEntity).json(e);
    }
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productsService.createProduct(name, quantity);

    res.status(Created).json(newProduct);
  } catch (e) {
    if (e.err.code === 'invalid_data') {
      res.status(UnprocessableEntity).json(e);
    }
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    await productsService.updateProduct(id, name, quantity);
    const get = await productsService.findByIdProducts(id);

    res.status(OK).json(get);
  } catch (e) {
    if (e.err.code === 'invalid_data') {
      res.status(UnprocessableEntity).json(e);
    }
  }
});

module.exports = router;
