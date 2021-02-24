const { Router } = require('express');
const { validateSale, validateId } = require('../middlewares/validateSale');
const SalesService = require('../services/SalesService');

const router = Router();

const STATUS200 = 200;
const STATUS201 = 201;

router.get('/', async (_req, res) => {
  const sales = await SalesService.getAll();
  // console.log(sales);

  res.status(STATUS200).json(sales);
});

router.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;

  const sale = await SalesService.getById(id);

  res.status(STATUS200).json(sale);
});

router.post('/', validateSale, async (req, res) => {
  const arraySales = req.body;
  // console.log(arraySales);

  const sale = await SalesService.create(arraySales);
  
  res.status(STATUS200).json(sale);
});

module.exports = router;