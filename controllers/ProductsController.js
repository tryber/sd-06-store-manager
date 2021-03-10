const { Router } = require('express');
const { createValidation, getByIdValidation, updateValidation, removeValidation } 
  = require('../services/ProductsService');
const { getAllProducts, getByIdProducts, createProducts } 
= require('../models/ProductsModel');

const router = Router();

const OK = 200;
const UNPROCESSABLE = 422;
const CREATED = 201;

router.post('/', createValidation, async (req, res) => {
  await createProducts(req.body);
  return res.status(CREATED).json(req.body);
 
});

// // Req 2
router.get('/', async (_req, res) => {
  const productsList = await getAllProducts();
  return res.status(OK).send({ products: productsList });
});

router.get('/:id', getByIdValidation, async (req, res) => {
  const { id } = req.params;
  const productId = await getByIdProducts(id);
  if (!productId) return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  });
  return res.status(OK).send(productId);
});

// Req 3
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {name, quantity} = req.body;
  const { err, code, update} = await updateValidation(id, name, quantity);
  
  if (!update) res.status(code).json({err});
  return res.status(code).json(update);
});

// Req 4
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const {err, code, remove} = await removeValidation(id);

  if (!remove) return res.status(code).json({err});
  return res.status(code).json(remove);
});

module.exports = router;
  