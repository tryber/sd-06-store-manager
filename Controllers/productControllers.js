const services = require('../Services/productServices');
const { Router } = require('express');
const productValidation = require('../Utils/productValidation');
const idValidate = require('../Utils/idValidation');
const testDuplicated = require('../Utils/testDuplicated');

const router = new Router;
const CREATED = 201;
const SUCCESS = 200;

router.post('/', productValidation, testDuplicated, async (req, res) => {
  const { name, quantity } = req.body;

  const createdProduct = await services.create(name, quantity);

  return res.status(CREATED).send(createdProduct);
});

router.get('/', async (_req, res) => {
  const productList = await services.getAll();

  res.status(SUCCESS).json({ products: productList });
});

router.get('/:id', idValidate, async (req, res) => {
  const { id } = req.params;

  const product = await services.findById(id);

  return res.status(SUCCESS).json(product);
});

router.put('/:id', idValidate, productValidation, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await services.updateById(id, name, quantity);

  return res.status(SUCCESS).send(updatedProduct);
});

module.exports = router;
