const { Router } = require('express');
const { create, getAll, getById } = require('../models/SalesModel');
const { ObjectId } = require('mongodb');

const router = Router();

// const CREATED = 201;
const UNPROCESSABLE= 422;
const OK = 200;
const NOT_FOUND =404;
// Magic Number
// const MIN_CHARS = 5;
const ZERO = 0;
// const ID_LENGTH = 24;

router.post('/', async (req, res) => {
  const itensSold = req.body;

  itensSold.forEach((item) => {
    if (item.quantity <= ZERO || isNaN(item.quantity)) {
      return res.status(UNPROCESSABLE).json({ 
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      });
    }  
  });

  const newSale = await create(itensSold);

  return res.status(OK).json(newSale);
});

// Req 6
router.get('/', async (_req, res) => {
  const sales = await getAll();

  return res.status(OK).json({sales});
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }});
  }
  const sale = await getById(id);
  if (!sale) {
    return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }});
  }
  return res.status(OK).json(sale);
});

module.exports = router;
