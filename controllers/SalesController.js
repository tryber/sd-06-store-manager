const { Router } = require('express');
const {
  getAllSalesService,
  createSaleService,
  getBySalesIdService
} = require('../service/SalesService');
const { validateSale, validateSalesId } = require('../middlewares/SalesMid');

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

router.get('/', async (req, res) => {
  const getAll = await getAllSalesService();
  return res.status(SUCCESS).json({ sales: getAll });
});

router.get('/:id', validateSalesId, async (req, res) => {
  const { id } = req.params;
  const product = await getBySalesIdService(id);
  return res.status(SUCCESS).json(product);
});

module.exports = router;
