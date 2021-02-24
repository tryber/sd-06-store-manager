const { Router } = require('express');
const Service = require('../service/SalesService');

const SalesController = new Router();
const OK = 200;
// const CREATED = 201;
const NOTFOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

// Get All Sales
SalesController.get('/', async (req, res) => {
  const sales = await Service.getAll();
  res.status(OK).json({ sales });
});

// Find Sale by ID
SalesController.get('/:id', async (req, res) => {
  const { id } = req.params;

  const { status, result } = await Service.findById(id);
  if (status === 'NOK') {
    return res.status(NOTFOUND)
      .json({err: { code: 'not_found', message: result }});
  }
  res.status(OK).json(result);
});

// Create New Sale
SalesController.post('/', async (req, res) => {
  const itensSold = req.body;

  const { status, result } = await Service.create(itensSold);
  if (status === 'NOK') {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({err: { code: 'invalid_data', message: result }});
  }
  res.status(OK).json(result);
});

// Update Sale
SalesController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  const { status, result } = await Service.update(id, itensSold);
  if (status === 'NOK') {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({err: { code: 'invalid_data', message: result }});
  }
  res.status(OK).json(result);
});

// // Delete Sale
// SalesController.delete('/:id', async (req, res) => {
//   const { id } = req.params;
  
//   const result = await Service.remove(id);
//   const { status } = result;
//   if (status === 'NOK') {
//     return res.status(UNPROCESSABLE_ENTITY).json(responseError(result));
//   }
//   const { Sale } = result;
//   res.status(OK).json(Sale);
// });

module.exports = SalesController;
