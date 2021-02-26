const { Router } = require('express');
const {
  getAllSalesService,
  createSaleService,
  getBySalesIdService,
  deleteSaleService,
  validateSalesIdForDelete,
} = require('../service/SalesService');
const { validateSale, validateSalesId } = require('../middlewares/SalesMid');

const router = Router();
const CREATED = 201;
const SUCCESS = 200;
const UNPROCESSABLE = 422;
const ZERO = 0;
const NOT_FOUND = 404;
const LIMITID = 24;

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
  if(!product) return res.status(NOT_FOUND).json({ err: {
    code: 'not_found',
    message: 'Sale not found'
  }});
  return res.status(SUCCESS).json(product);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if(id.length < LIMITID) return res.status(UNPROCESSABLE).json({ err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format'
  }});

  const deleted = await deleteSaleService(id);
  if (!deleted) return res.status(UNPROCESSABLE).json({ err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format'
  }});

  return res.status(SUCCESS).json(deleted);
});

module.exports = router;
