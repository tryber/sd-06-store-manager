const { Router } = require('express');
const Sales = require('../services/SalesService');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { validateSales } = require('../middlewares');

const router = new Router();
router.use(bodyParser.json());

const SUCCESS = 200;

router.post('/', validateSales, rescue(async (req, res) => {
  const objectSales = req.body;
  const newSale = await Sales.create(objectSales);

  return res.status(SUCCESS).json(newSale);
}),
);

module.exports = router;
