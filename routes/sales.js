const express = require('express');
const {
  createSale,
  getSale,
  getSales,
  updateSale,
  deleteSale,
} = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.post('/', createSale);

salesRouter.get('/:id', getSale);

salesRouter.get('/', getSales);

salesRouter.put('/:id', updateSale);

salesRouter.delete('/:id', deleteSale);

module.exports = salesRouter;
