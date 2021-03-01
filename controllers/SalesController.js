const { Router } = require('express');
const { create, getAll, getSaleById, deleteSale } = require('../models/SalesModel');
const {ObjectId} = require('mongodb');

const SalesController = new Router();
const STATUS_OK = 200;
const STATUS_UNPROCESSABLE= 422;
const STATUS_NOT_FOUND= 404;
const ZERO = 0;

SalesController.post('/', async (req, res) => {
  const itens = req.body;
  itens.forEach((item) => {
    if (item.quantity <= ZERO || isNaN(item.quantity)) {
      return res.status(STATUS_UNPROCESSABLE).json({ 
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      });
    }  
  });

  const register = await create(req.body);

  return res.status(STATUS_OK).json(register);
});

SalesController.get('/', async (req, res) => { 
  const allSales = await getAll();
  return res.status(STATUS_OK).json({'sales': allSales});
});

SalesController.get('/:id', async (req, res) => {
  const id = req.params.id;
  if(ObjectId.isValid(id)){
    const sale = await getSaleById(id);
    return res.status(STATUS_OK).json(sale);
  }
  return res.status(STATUS_NOT_FOUND).json({
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }});
});

SalesController.put('/:id', async (req, res) => {
  const id = req.params.id;
  const itens = req.body;
  itens.forEach((item) => {
    if (item.quantity <= ZERO || isNaN(item.quantity)) {
      return res.status(STATUS_UNPROCESSABLE).json({ 
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      });
    }  
  });
  await updateSale(id, itens);
  const updatedSale = await getSaleById(id);
  return res.status(STATUS_OK).json(updatedSale);
 
});
SalesController.delete('/:id', async (req, res) => {
  const id = req.params.id;
  if(ObjectId.isValid(id)){
    const deletedSale = await getSaleById(id);
    if (!deletedSale) res.status(STATUS_NOT_FOUND)
      .json({
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }}); 
      
    await deleteSale(id);
    return res.status(STATUS_OK).json(deletedSale);
  }
  return res.status(STATUS_UNPROCESSABLE)
    .json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }});
});

module.exports = SalesController;