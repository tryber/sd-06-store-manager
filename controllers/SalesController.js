const { Router } = require('express');
const { create } = require('../models/SalesModel');

const SalesController = new Router();
const STATUS_OK = 200;
const STATUS_UNPROCESSABLE= 422;
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

module.exports = SalesController;