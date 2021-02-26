const { Router } = require('express');
const {
  getAllSalesService,
  createSaleService
} = require('../service/SalesService');
const { validateSale } = require('../middlewares/SalesMid');

const router = Router();
const CREATED = 201;
const SUCCESS = 200;
const UNPROCESSABLE = 422;
const ZERO = 0;

router.post('/', validateSale, async (req, res) => {
  const products = req.body;
  const salesCreated = await createSaleService(products);
  return res.status(SUCCESS).json(salesCreated);
});

module.exports = router;
