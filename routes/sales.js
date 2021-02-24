const express = require('express');
const {
  createSale,
  getSale,
  getSales,
} = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.post('/', createSale);

salesRouter.get('/:id', getSale);

salesRouter.get('/', getSales);

module.exports = salesRouter;
