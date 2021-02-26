const { Router } = require('express');

const {
  getAll,
  getById,
  create,
  updateById,
  deleteById
} = require('../controllers/productController');

const products = Router();

products.get('/', getAll);
products.get('/:id', getById);
products.post('/', create);
products.put('/:id', updateById);
products.delete('/:id', deleteById);

module.exports = products;
