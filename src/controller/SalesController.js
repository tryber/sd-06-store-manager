const { Router } = require('express');
const Service = require('../service/SalesService');

const SalesController = new Router();
const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

// Get All Sales
SalesController.get('/', async (req, res) => {
  const sales = await Service.getAll();
  res.status(OK).json({ sales });
});

// // Find Sale by ID
// SalesController.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   const result = await Service.findById(id);
//   const { status } = result;
//   if (status === 'NOK') {
//     return res.status(UNPROCESSABLE_ENTITY).json(responseError(result));
//   }
//   const { Sale } = result;
//   res.status(OK).json(Sale);
// });

// Create New Sale
SalesController.post('/', async (req, res) => {
  const itensSold = req.body;

  const { status, result } = await Service.create(itensSold);
  // console.log('status', status);
  // console.log('result', result);
  if (status === 'NOK') {
    return res.status(UNPROCESSABLE_ENTITY).json(responseError(result));
  }
  res.status(OK).json(result);
});

// // Update Sale
// SalesController.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;

//   const result = await Service.update(id, name, quantity);
//   const { status } = result;
//   if (status === 'NOK') {
//     return res.status(UNPROCESSABLE_ENTITY).json(responseError(result));
//   }
//   const { Sale } = result;
//   res.status(OK).json(Sale);
// });

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


const responseError = (message) => {
  return { err: { code: 'invalid_data', message } };
};

module.exports = SalesController;
