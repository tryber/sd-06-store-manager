const { Router } = require('express');
const rescue = require('express-rescue');
const Products = require('../models/Products');
const { productValidation } = require('../schemas/productValidation');

const router = new Router();

const ERROR = 422;
const SUCCESS = 201;
const OK = 200;

router.post('/', productValidation, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const data = await Products.getByName(name);

  if(data) {
    return res.status(ERROR).json({
      err: { code: 'invalid_data', message: 'Product already exists' }
    });
  }

  await Products.create(name, quantity);
  const productInserted = await Products.getByName(name);
  return res.status(SUCCESS).json(productInserted);
}));

router.get('/', rescue(async (_req, res) => {
  const fetchedProduct = await Products.getAll();

  return res.status(OK).json({ products: fetchedProduct });
}));

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
  
    const fetchedProduct = await Products.findById(id);

    return res.status(OK).json(fetchedProduct);
  } catch (err) {
    return res.status(ERROR).json({
      err: { code: 'invalid_data', message: 'Wrong id format' }
    });
  }
});

module.exports = router;
