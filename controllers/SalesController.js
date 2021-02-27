const { Router } = require('express');
const { 
  validateSale,
  validateExistingSale,
  validateDeletedSale
} = require('../middlewares/SalesMid');

const {
  createSalesService,
  getAllSalesService,
  getByIdService,
  deleteSaleService
} = require('../service/SalesService');

const routerSales = Router();
const CREATED = 201;
const SUCCESS = 200;
const UNPROCESSABLE = 422;

routerSales.post('/', validateSale, async (req, res) => {
  const itensSold = req.body;
  const _id = await createSalesService(itensSold);
  const salesReturn = { _id, itensSold };
  return res.status(SUCCESS).json(salesReturn);
});

routerSales.get('/', async (req, res) => {
  const allSales = await getAllSalesService();
  return res.status(SUCCESS).json({sales: allSales});
});

routerSales.get('/:id', validateExistingSale, async (req, res) => {
  const { id } = req.params;
  const selectedSale = await getByIdService(id);
  return res.status(SUCCESS).json(selectedSale);
});

routerSales.delete('/:id', validateDeletedSale, async (req, res) => {
  const { id } = req.params;
  const deletedSale= await deleteSaleService(id);
  // if(!deleted) return res.status(UNPROCESSABLE).json({ err: {
  //   code: 'invalid_data',
  //   message: 'Wrong id format'
  // }});
  return res.status(SUCCESS).json(deletedSale);
});

module.exports = routerSales; 
