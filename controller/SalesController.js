const { Router } = require('express');
const rescue = require('express-rescue');
const { ObjectId } = require('mongodb');

const router = Router();
const SalesService = require('../service/SalesService');
const OK = 201;
const ERROR = 422;
const NOT_FOUND = 404;
const SUCCESS = 200;
const ZERO = 0;

router.post('/sales', rescue (async (req, res) => {
  const products = req.body;

  const insertedId = await SalesService.registerSale(products);
  const quantity = products.map((product) => product.quantity);

  const isNotValid = quantity.some((item) => item <= ZERO || typeof item !== 'number');

  if (isNotValid) {
    return res.status(ERROR)
      .json({err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      } });
  }

  return res.status(SUCCESS).json({ _id:insertedId, itensSold:products });
}));

router.get('/sales', rescue (async (req, res) => {
  const allSales = await SalesService.getAll();
  res.status(SUCCESS).json({ sales:allSales });
}));

router.get('/sales/:id', rescue (async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(NOT_FOUND)
      .json({err: { 
        code: 'not_found',  
        message: 'Sale not found' 
      } });
  }

  const sale = await SalesService.getById(id);

  if (!sale) {
    return res.status(NOT_FOUND)
      .json({err: { 
        code: 'not_found',  
        message: 'Sale not found'
      } });
  }

  return res.status(SUCCESS).json(sale);
}));

router.put('/sales/:id', rescue (async (req, res) => {
  const { id } = req.params;
  const products = req.body;
  console.log('products controller', products);

  /*   const quantity = products.map((product) => product.quantity);
  const isNotValid = quantity.some((item) => item <= ZERO || typeof item !== 'number');

  if (isNotValid) {
    return res.status(ERROR)
      .json({err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      } });
  } */

  const insertedId = await SalesService.updateSale(id);
  return res.status(SUCCESS).json({ _id:insertedId, itensSold:products });
}));

router.delete('/sales/:id', rescue (async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(ERROR)
      .json({err: { 
        code: 'invalid_data',  
        message: 'Wrong sale ID format' 
      } });
  }

  const deletedSale = await SalesService.getById(id);

  if (!ObjectId.isValid(id)) {
    return res.status(ERROR)
      .json({err: { 
        code: 'invalid_data',  
        message: 'Wrong sale ID format' 
      } });
  }

  await SalesService.deleteSale(id);
  res.status(SUCCESS).json(deletedSale);
}));

module.exports = router;
