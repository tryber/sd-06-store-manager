const { Router } = require('express');
const { ObjectId } = require('mongodb');

const router = Router();

const productsService = require('../services/productsService');
const statusOk = 200;
const statusSucess = 201;
const clientError = 422;

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const result = await productsService.create(name, quantity);

  if (result.err) return res.status(result.err.codeStatus)
    .json({ err: {
      code: result.err.code,
      message: result.err.message
    } });

  return res.status(statusSucess).json(result);
});

router.get('/', async (req, res) => {
  const result = await productsService.getAll();

  if (result) res.status(statusOk).json({ products: result });
});

router.get('/:id', async (req, res) => {
  const productById = await productsService.getById(req.params.id);

  if (!productById) return res.status(clientError).json({ productById });

  return res.status(statusOk).json(productById);
});

module.exports = router;
