const { Router } = require('express');
const rescue = require('express-rescue');
const sales = require('../models/sales');
const services = require('../services/sales');
const status200 = 200;
const status422 = 422;
const status404 = 404;
const status500 = 500;

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

routerSales.get('/', rescue(async (_req, res) => {
  try {
    const allSales = await sales.showAllSales();
    return res.status(status200).json({ allSales });
  } catch (err) {
    return res.status(status500).json(err.message);
  }
}));

routerSales.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  try {
    const response = await services.showSaleById(id);
    return res.status(status200).json(response);
  } catch (err) {
    if (err.code === 'not_found') {
      return res.status(status404).json({ err });
    }
    return res.status(status500).json(err.message);
  }
}));

routerSales.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];
  try {
    const response = await services.updateSale(id, productId, quantity);
    return res.status(status200).json(response);
  } catch (err) {
    if (err.code === 'not_found') {
      return res.status(status404).json({ err });
    }
    if (err.code === 'invalid_data') {
      return res.status(status422).json({ err });
    }
    return res.status(status500).json(err.message);
  }
}));

routerSales.delete('/:id', async (req, res) => {
  try {
    const saleById = await sales.showSaleById(req.params.id);
    if (!saleById) {
      return res.status(status422).json({
        err: {
          code: 'invalid_code',
          message: 'Wrong sale ID format'
        },
      });
    }
    await sales.deleteSale(req.params.id);
    res.status(status200).json();
  } catch (err) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
});

module.exports = routerSales;
