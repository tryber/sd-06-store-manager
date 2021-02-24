const { Router } = require('express');
const rescue = require('express-rescue');

const router = Router();
const SalesService = require('../service/SalesService');
const OK = 201;
const ERROR = 422;
const SUCCESS = 200;
const ZERO = 0;

router.post('/sales', rescue (async (req, res) => {
  const { productId, quantity } = req.body;
  const productData = { productId, quantity };

  const insertedId = await SalesService.registerSale(productData);
  return res.status(SUCCESS).json({ _id:insertedId, productData });
}));

module.exports = router;
