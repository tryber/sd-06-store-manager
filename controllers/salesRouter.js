const { Router } = require('express');

const salesModel = require('../models/productsModel');
const {
  validationSalesBody,
  postSales
} = require('../services/salesMiddleware');

const salesRouter = Router();

salesRouter.post('/',
  validationSalesBody,
  postSales,
  async (_req, res) => {
    const status = 200;
    res.status(status).json(res.locals.objAdicionado);
  }
);

module.exports = salesRouter;
