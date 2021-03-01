const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../services/serviceSale');
const registerSales = require('../services/validationsSales/registerSales');
const verifyObjectId = require('../services/validationsSales/verifyObjectId');
const checkIdSale = require('../services/validationsSales/checkIdSale');

const SUCCESS = 200;
const CREATED = 201;

const router = Router();

router.get('/:id', checkIdSale, rescue(async (req, res) => {
  const { id } = req.params;

  const sale = await service.getByIdSale(id);

  return res.status(SUCCESS).json(sale);
}));

router.get('/', rescue(async (req, res) => {
  const { productId, quantity } = req.body;
  const sales = await service.getAllSales();
  // console.log('sales', sales);
  return res.status(SUCCESS).json({sales});
}));


router.post('/', registerSales, rescue(async (req, res) => {
  const itensSold = req.body;
  
  // console.log('itensSold', itensSold);

  const insertedId = await service.createSale(itensSold);
    
  return res.status(SUCCESS).json({_id: insertedId, itensSold});
}));

router.put('/:id', registerSales, rescue(async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];

  const update = await service.updateSale(id, productId, quantity);

  return res.status(SUCCESS).json(update);
}));

router.delete('/:id', verifyObjectId, rescue(async (req, res) => {
  const { id } = req.params;
  
  const exclude = await service.excludeSale(id);
  // console.log('exclude', exclude);
  return res.status(SUCCESS).json(exclude);
}));

module.exports = router;