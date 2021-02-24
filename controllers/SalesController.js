const { Router } = require('express');
const { validateSale } = require('../middlewares/validateSale');
const SalesService = require('../services/SalesService');

const router = Router();

const STATUS200 = 200;
const STATUS201 = 201;

router.post('/', validateSale, async (req, res) => {
  const arraySales = req.body;
  console.log(arraySales);

  const sale = await SalesService.create(arraySales);
  
  res.status(STATUS200).json(sale);
});

module.exports = router;