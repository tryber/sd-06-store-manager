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

module.exports = router;
