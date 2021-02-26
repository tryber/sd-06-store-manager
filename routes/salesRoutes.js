const { Router } = require('express');

const sales = Router();

const {
  getAll,
  getById,
  create,
  updateById,
  deleteById
} = require('../controllers/salesController');

sales.get('/', getAll);
sales.get('/:id', getById);
sales.post('/', create);
sales.put('/:id', updateById);
sales.delete('/:id', deleteById);

module.exports = sales;
