const { Router } = require('express');
const Sales = require('../services/SalesService');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const {
  validateSales,
  validateIdSales,
} = require('../middlewares');

const router = new Router();
router.use(bodyParser.json());

const SUCCESS = 200;

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

router.get('/:id',validateIdSales, rescue(async (req, res) => {
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

module.exports = router;
