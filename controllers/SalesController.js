const { Router } = require('express');
const SalesService = require('../services/SalesService');
const { saleValidationRules, validateSale } = require('../middlewares/validateSale');

const router = Router();
const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

router.post('/', saleValidationRules(), validateSale, async (req, res) => {
  const itensSold = req.body;

  const registeredSale = await SalesService.register(itensSold);

  res.status(OK).json(registeredSale);
});

module.exports = router;
