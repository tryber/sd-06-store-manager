const { Router } = require('express');
const SalesService = require('../services/SalesService');
const { saleValidationRules, validateSale } = require('../middlewares/validateSale');
const { validateSaleId } = require('../middlewares/validateId');

const router = Router();
const OK = 200;
const NOT_FOUND = 404;

router.get('/', async (req, res) => {
  const sales = await SalesService.getAll();

  res.status(OK).json({ sales });
});

router.get('/:id', validateSaleId, async (req, res) => {
  const { id } = req.params;

  const sales = await SalesService.findById(id);

  if (!sales)
    return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });

  res.status(OK).json({ sales });
});

router.post('/', saleValidationRules(), validateSale, async (req, res) => {
  const itensSold = req.body;

  const registeredSale = await SalesService.register(itensSold);

  res.status(OK).json(registeredSale);
});

router.put('/:id', saleValidationRules(), validateSale, async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const updated = await SalesService.update(id, sale);

  res.status(OK).json(updated.value);
});

module.exports = router;
