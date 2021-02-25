const { Router } = require('express');

const services = require('../services/salesService');

const sales = Router();
const { STATUS_CODES: { OK } } = require('../utils/dictionary');

sales.post('/', async (req, res, next) => {
  try {
    const sales = req.body;
    const newSales = await services.create(sales);

    res.status(OK).json(newSales);
  } catch(err) {
    next(err);
  }
});

sales.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const salesById = await services.getById(id);

    res.status(OK).json(salesById);
  } catch (err) {
    next(err);
  }
});

sales.get('/', async (req, res) => {
  const sales = await services.getAll();
  res.status(OK).json({ sales });
});

sales.put('/:id', async (req, res, next) => {
  try {
    const {params: { id }, body: sale } = req;
    const updateSales = await services.updateById(id, sale);

    res.status(OK).json(updateSales);
  } catch(err) {
    next(err);
  }
});

sales.delete('/:id', async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const deletedSale = await services.deleteById(id);

    res.status(OK).json(deletedSale);
  } catch (err) {
    next(err);
  }
});

module.exports = sales;
