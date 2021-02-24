const { Router } = require('express');
const rescue = require('express-rescue');
const SalesService = require('../services/SalesService');
const router = Router();

const CREATED = 201;
const SUCCESS = 200;

router.post('/', rescue(async (req, res) => {
  const sale = await SalesService.insertProducts(req.body);

  return res.status(SUCCESS).json(sale);
}));

router.get('/', rescue(async (req, res) => {
  const sales = await SalesService.getAll();

  return res.status(SUCCESS).json({ sales });
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await SalesService.findById(id);

  return res.status(SUCCESS).json({ sale });
}));

router.use((err, _req, res, next) => {
  res.status(err.statuscode).json({ err: err.message });
});

module.exports = router;