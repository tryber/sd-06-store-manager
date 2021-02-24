const { Router } = require('express');
const rescue = require('express-rescue');
const SalesService = require('../services/SalesService');
const router = Router();

const CREATED = 201;
const SUCCESS = 200;

router.post('/', rescue(async (req, res) => {
  const product = await SalesService.insertProducts(req.body);

  return res.status(SUCCESS).json(product);
}));

router.use((err, _req, res, next) => {
  res.status(err.statuscode).json({ err: err.message });
});

module.exports = router;