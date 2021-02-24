const { Router } = require('express');
const { ObjectId } = require('mongodb');

const router = Router();

const productsService = require('../services/productsService');
const status200 = 200;
const status201 = 201;
const status422 = 422;

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const result = await productsService.create(name, quantity);

  if (result.err) return res.status(result.err.codeStatus)
    .json({ err: {
      code: result.err.code,
      message: result.err.message
    } });

  return res.status(status201).json(result);
});

router.get('/', async (req, res) => {
  const result = await productsService.getAll();

  if (result) res.status(status200).json({ products: result });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const productById = await productsService.getById(id);

  if (productById.err) return res.status(status422).json(productById);

  return res.status(status200).json(productById);
});

router.put('/:id', async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const result = await productsService.upDate(id, name, quantity);

  if (result.err) return res.status(result.err.codeStatus)
    .json({ err: {
      code: result.err.code,
      message: result.err.message
    } });

  return res.status(status200).json(result);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const productExcluded = await productsService.exclude(id);

  if (productExcluded.err) return res.status(status422).json(productExcluded);

  return res.status(status200).json(productExcluded);
});

module.exports = router;
