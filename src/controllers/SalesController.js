const { Router } = require('express');
const { 
  createValidation,
  getAllValidation,
  getByIdValidation,
  editValidation,
  deleteValidation
} = require ('../services/SalesService');

const SalesController = new Router();

const STATUS_OK = 200;

// Requisito 5
SalesController.post('/', async (req, res) => {
  const itens = req.body;
  const register = await createValidation(itens);
  return res.status(STATUS_OK).json(register);
});

// Requisito 6
SalesController.get('/', async (_req, res) => {
  const sales = await getAllValidation();
  return res.status(STATUS_OK).json({sales});
});

SalesController.get('/:id', async (req, res) => {
  const id = req.params.id;
  const sale = await getByIdValidation(id);
  return res.status(STATUS_OK).json(sale);
});

// Requisito 7
SalesController.put('/:id', async (req, res) => {
  const updatedItens = req.body;
  const id = req.params.id;
  const updateSale = await editValidation(id, updatedItens);
  return res.status(STATUS_OK).json(updateSale);
});

// Requisito 8
SalesController.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const deleteSale = await deleteValidation(id);
  return res.status(STATUS_OK).json(deleteSale);
});

module.exports = SalesController;