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
const STATUS_INTERNAL_ERROR = 500;

// Requisito 5
SalesController.post('/', async (req, res) => {
  try {
    const itens = req.body;
    const {err, code, create} = await createValidation(itens);
    if (!create) return res.status(code).json({ err });
    return res.status(code).json(create);
  } catch (error) {
    return res.status(STATUS_INTERNAL_ERROR).json({message: error.message});
  }
});

// Requisito 6
SalesController.get('/', async (_req, res) => {
  const {code, sales} = await getAllValidation();
  
  return res.status(code).json({sales: sales});
});

SalesController.get('/:id', async (req, res) => {
  const id = req.params.id;
  const {err, code, sale} = await getByIdValidation(id);
  
  if (!sale) return res.status(code).json({ err });
  return res.status(code).json(sale);
});

// Requisito 7
SalesController.put('/:id', async (req, res) => {
  const updatedItens = req.body;
  const id = req.params.id;
  const { err, code, updateSale} = await editValidation(id, updatedItens);
  
  if (!updateSale) res.status(code).json({err});
  return res.status(code).json(updateSale);
});

// Requisito 8
SalesController.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const {err, code, deleteSale} = await deleteValidation(id);

  if (!deleteSale) return res.status(code).json({err});
  return res.status(code).json(deleteSale);
});

module.exports = SalesController;