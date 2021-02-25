const { Router } = require('express');
const { create, getAll, getById, exclude } = require('../models/SalesModel');
const { ObjectId } = require('mongodb');

const SalesController = new Router();

const STATUS_OK = 200;
const STATUS_NOTFOUND= 404;
const STATUS_UNPROCESSABLE= 422;
const ZERO = 0;

// Requisito 5
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
  
  const register = await create(itens);

  return res.status(STATUS_OK).json(register);
});

// Requisito 6
SalesController.get('/', async (_req, res) => {
  const sales = await getAll();

  return res.status(STATUS_OK).json({sales});
});

SalesController.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(STATUS_NOTFOUND)
      .json({
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }});
  }
  const sale = await getById(id);
  if (!sale) {
    return res.status(STATUS_NOTFOUND)
      .json({
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }});
  }
  return res.status(STATUS_OK).json(sale);
});

// Requisito 8
SalesController.delete('/:id', async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(STATUS_UNPROCESSABLE)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format'
        }});
  }
  const deletedSale = await getById(id);
  await exclude(id);
  return res.status(STATUS_OK).json(deletedSale);
});

module.exports = SalesController;