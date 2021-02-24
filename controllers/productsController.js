const { Router } = require('express');
const productsService = require('../services/productsService');
const { nameAndQuantityValidation } = require('../middlewares/nameAndQuantityValidation');
const { idValidation } = require('../middlewares/idValidation');
const { nameExistValidation } = require('../middlewares/nameExistValidation');

const router = Router();

const OK = 200;
const CREATED = 201;

router.get('/', async (_req, res) => {
  const products = await productsService.getAllProducts();

  res.status(OK).json({ products });
});

router.get('/:id', idValidation, async (req, res) => {
  const { id } = req.params;

  const productById = await productsService.findProductById(id);

  res.status(OK).json(productById);
});

router.post('/', nameExistValidation, nameAndQuantityValidation, async (req, res) => {
  const { name, quantity } = req.body;

  const { insertedId } = await productsService.createNewProduct(name, quantity);

  const product = {
    _id: insertedId,
    name,
    quantity
  };

  res.status(CREATED).json(product);
});

router.put('/:id', idValidation, nameAndQuantityValidation, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  await productsService.updateProduct(id, name, quantity);

  const product = {
    _id: id,
    name,
    quantity
  };

  res.status(OK).json(product);
});

module.exports = router;
