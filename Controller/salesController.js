const salesService = require('../Service/salesService');
const { Router } = require('express');
const {  quantityNotNegativeOrZeroSales,
  quantityNotAStringSales } = require('../Middlewares/validation');

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

module.exports = router;