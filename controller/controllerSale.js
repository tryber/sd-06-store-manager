const { Router } = require('express');
const rescue = require('express-rescue');
const sales = require('../models/sales');
const services = require('../services/sales');
const status200 = 200;
const status422 = 422;
const status404 = 404;

const routerSales = Router();

routerSales.post('/', rescue(async (req, res) => {
  const allSale = req.body;
  try {
    const response = await services.createSale(allSale);
    return res.status(status200).json(response);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(status422).json({ err });
    }
    if (err.code === 'stock_problem') {
      return res.status(status404).json({ err });
    }
  }
}));

module.exports = {
  routerSales,
};
