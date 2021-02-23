const { Router } = require('express');
const rescue = require('express-rescue');
const Products = require('../models/Products');
const productValidation = require('../schemas/productValidation');

const router = new Router();

const ERROR = 422;
const SUCCESS = 201;

router.post('/', productValidation, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const data = await Products.getByName(name);

  if(data.length) {
    return res.status(ERROR).json({
      err: { code: 'invalid_data', message: 'Product already exists' }
    });
  }

  await Products.create(name, quantity);
  return res.status(SUCCESS).json({ name, quantity });
}));

router.get('/', rescue(async (_req, res) => {
  const fetchedProduct = await Products.getAll();

  return res.status(ERROR).json(fetchedProduct);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const fetchedProduct = await Products.findById(id);

  return res.status(ERROR).json(fetchedProduct);
}));

module.exports = router;
