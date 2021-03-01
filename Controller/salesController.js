const salesService = require('../Service/salesService');
const { Router } = require('express');
const {  quantityNotNegativeOrZeroSales,
  quantityNotAStringSales,
  validateIdSale, wrongIdSale } = require('../Middlewares/validation');

const router = Router();
const Created = 201;
const OK = 200;

//Requisito-5
router.post('/', quantityNotNegativeOrZeroSales,
  quantityNotAStringSales, async(req, res) => {
    const sale = req.body;
  
    const newSale = await salesService.createSaleService(sale);  
    return res.status(OK).json(newSale);
  });

//Requisito-6
router.get('/', async(req, res) => {
  const listOfSales = await salesService.listSalesService();
  return res.status(OK).json({sales: listOfSales});
});

router.get('/:id', validateIdSale, wrongIdSale, async(req, res) => {
  const { id } = req.params;
  const sale = await salesService.saleByIdService(id);
  return res.status(OK).json(sale);
});
module.exports = router;