const { Router } = require('express');
const { getAllSales, createSales, getByIdSales, updateSales } = require('../models/salesModels');
const { setValidation, setValidationID } = require('../services/salesService');

const sales = new Router();

const SUCCESS = 200;
const NOT_FOUND = 404;

sales.get(
  '/sales', async (_req, res) => {
    const salesList = await getAllSales();
    return res.status(SUCCESS).send({sales: salesList});
  });

sales.get(
  '/sales/:id', setValidationID, async (req, res) => {
    const { id } = req.params;
    const salesID = await getByIdSales(id);
    if (!salesID) return res.status(NOT_FOUND ).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
    return res.status(SUCCESS).send(salesID);
  });

sales.post(
  '/sales', setValidation, async (req, res) => {
    const newSale = await createSales(req.body);
    res.status(SUCCESS).json(newSale);
  }
);

sales.put(
  '/sales/:id', setValidationID, setValidation, async (req, res) => {
    const { id } = req.params;
    await updateSales(id, req.body);
    const updatedSales = await getByIdSales(id);
    return res.status(SUCCESS).send(updatedSales);
  });

module.exports = { sales };
