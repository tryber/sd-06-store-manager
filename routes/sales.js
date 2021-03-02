const express = require('express');
const {
  createSale,
  getSale,
  getSales,
  updateSale,
} = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.post('/', createSale);

salesRouter.get('/:id', getSale);

salesRouter.get('/', getSales);

salesRouter.put('/:id', updateSale);

module.exports = salesRouter;
