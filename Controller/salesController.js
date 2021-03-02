const salesService = require('../Service/salesService');
const { Router } = require('express');
const {  quantityNotNegativeOrZeroSales,
  quantityNotAStringSales,
  validateIdSale, wrongIdSale,
  validateIdSaleDelete,
  wrongIdSaleDelete } = require('../Middlewares/validationSales');

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

//Requisito-7
router.put('/:id', quantityNotNegativeOrZeroSales,
  quantityNotAStringSales, async(req, res) => {
    const { id } = req.params;
    const salesSoldBody = req.body;
    await salesService.updateSaleService(id, salesSoldBody);

    const saleUpdated = await salesService.saleByIdService(id);
    return res.status(OK).json(saleUpdated);
  });

// Requisito-8
router.delete('/:id',validateIdSaleDelete, wrongIdSaleDelete, async(req, res) => {
  const { id } = req.params;
  const saleDeleted = await salesService.saleByIdService(id);
  await salesService.deleteSaleService(id);
  return res.status(OK).json(saleDeleted);
});

module.exports = router;