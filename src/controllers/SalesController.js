const { Router } = require('express');
const Sales = require('../services/SalesService');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const {
  validateSales,
  validateIdSales,
  validateIdSalesRemove
} = require('../middlewares');

const router = new Router();
router.use(bodyParser.json());

const SUCCESS = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE = 422;

router.post('/', validateSales, rescue(async (req, res) => {
  const objectSales = req.body;
  const newSale = await Sales.create(objectSales);

  return res.status(SUCCESS).json(newSale);
}),
);

router.get('/', rescue(async (_req, res) => {
  const allSales = await Sales.getAll();
  res.status(SUCCESS).json({ sales: allSales });
}),
);

router.get('/:id', validateIdSales, rescue(async (req, res) => {
  const { id } = req.params;
  const allSales = await Sales.getById(id);

  if (!allSales) {
    return res.status(NOT_FOUND).json(
      {err: {
        code: 'not_found',
        message: 'Sale not found',
      }}
    );
  }

  res.status(SUCCESS).json(allSales);
}),
);

router.put('/:id', validateSales, validateIdSales,rescue(async (req, res) => {
  const { id } = req.params;
  const arraySales = req.body;
  const { productId, quantity } = arraySales[0];
  const updateSales = await Sales.update(id, productId, quantity);

  res.status(SUCCESS).json(updateSales);
}),
);

router.delete('/:id', validateIdSalesRemove, rescue(async (req, res) => {
  const { id } = req.params;
  const allSales = await Sales.getById(id);

  if (!allSales) {
    return res.status(UNPROCESSABLE).json(
      {err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }}
    );
  }

  await Sales.remove(id);
  return res.status(SUCCESS).json(allSales);
}),
);

module.exports = router;
