const express = require('express');
const {
  createSale,
} = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.post('/', createSale);

module.exports = salesRouter;
