const express = require('express');
const SalesModel = require('../models/SalesModel');
const validateSales = require('../utils/validateSales');
const { ObjectId } = require('mongodb');

const salesRouter = express.Router();

const SUCCESS = 200;
const CREATED = 201;
const INVALID = 422;
const NOT_FOUND = 404;

salesRouter.get('/', async (_req, res) => {
  const getSales = await SalesModel.getAll();
  res.status(SUCCESS).json(getSales);
});

salesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  const valId = ObjectId.isValid(id);
  
  if (!valId) {
    return res.status(NOT_FOUND).json({ err: 
      {code: 'not_found', message: 'Sale not found'}});
  };
    
  const productByID = await SalesModel.getById(ObjectId(id));

  if (!productByID) {
    return res.status(NOT_FOUND).json({ err: 
      {code: 'not_found', message: 'Sale not found'}});
  };

  return res.status(SUCCESS).json(productByID);
});
    
salesRouter.post('/', async (req, res) => {
  const arr = req.body;
  if (await validateSales.validateSale(res, arr)) {
    const ok = await SalesModel.create(arr);
    res.status(SUCCESS).json(ok);
  }
});

// salesRouter.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const [ { productId, quantity } ] = req.body;
//   console.log(productId);
//   // if (await validate.validateUpdateProducts(res, productId, quantity)) {
//   const updated = await SalesModel.update(productId, quantity, id);
//   res.status(SUCCESS).json(updated);
//   // }
// });

salesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const valId = ObjectId.isValid(id);
  
  if (!valId) {
    return res.status(INVALID).json({ err: 
      {code: 'invalid_data', message: 'Wrong sale ID format'}});
  };

  const productByID = await SalesModel.getById(ObjectId(id));

  if (!productByID) {
    return res.status(INVALID).json({ err: 
      {code: 'invalid_data', message: 'Wrong sale ID format'}});
  };

  const removed = await SalesModel.remove(id);
  return res.status(SUCCESS).json(removed);
});


module.exports = salesRouter;