const controllers = require('../Controllers/productControllers');
const { Router } = require('express');
const productValidation = require('../Utils/Products/productValidation');
const idValidate = require('../Utils/Products/idValidation');
const testDuplicated = require('../Utils/Products/testDuplicated');

const router = new Router;
const CREATED = 201;
const SUCCESS = 200;

router.post('/', productValidation, testDuplicated, async (req, res) => {
  const { name, quantity } = req.body;

  const createdProduct = await controllers.create(name, quantity);

  return res.status(CREATED).send(createdProduct);
});

router.get('/', async (_req, res) => {
  const productList = await controllers.getAll();

  res.status(SUCCESS).json({ products: productList });
});

router.get('/:id', idValidate, async (req, res) => {
  const { id } = req.params;

  const product = await controllers.findById(id);

  return res.status(SUCCESS).json(product);
});

router.put('/:id', idValidate, productValidation, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await controllers.updateById(id, name, quantity);

  return res.status(SUCCESS).send(updatedProduct);
});

router.delete('/:id', idValidate, async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await controllers.deleteById(id);

  return res.status(SUCCESS).send(deletedProduct);
});

module.exports = router;
