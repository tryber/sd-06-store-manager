const { Router } = require('express');

const {
  validationSalesBody,
  postSales,
  getAllSales,
  findByIdSales,
  deleteSale
} = require('../services/salesMiddleware');

const salesRouter = Router();

salesRouter.get('/',
  getAllSales,
  async (_req, res) => {
    const status = 200;
    res.status(status).json(res.locals.allSales);
  }
);

salesRouter.get('/:id',
  findByIdSales,
  async (_req, res) => {
    const status = 200;
    res.status(status).json(res.locals.sale);
  }
);

salesRouter.post('/',
  validationSalesBody,
  postSales,
  async (_req, res) => {
    const status = 200;
    res.status(status).json(res.locals.objAdicionado);
  }
);

salesRouter.delete('/:id',
  deleteSale,
  async (_req, res) => {
    const status = 200;
    res.status(status).json(res.locals.sale);
  }
);

module.exports = salesRouter;
