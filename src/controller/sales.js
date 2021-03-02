const { Router } = require('express');
const rescue = require('express-rescue');
const Service = require('../services/sales');
const Sales = Router();
const OK = 200;
const CREATED = 201;
const UNPROCESSABLE = 422;
const NOT_FOUND = 404;

Sales.get('/', rescue(async (req, res) => {
  const data = await Service.getAll();
  res.status(OK).json(data);
}));

Sales.put('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Service.update(id, req.body);
    res.status(OK).json(data);
  } catch (err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity' }});
  }
}));

Sales.get('/:id', rescue(async (req, res) => {
  try {
    const data = await Service.getById(req.params.id);
    res.status(OK).send(data);
  } catch (err) {
    res.status(NOT_FOUND).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
}));

Sales.post('/', rescue(async (req, res) => {
  try {
    const data = await Service.create(req.body);
    res.status(OK).json(data);
  } catch (err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity' }});
  }
}));

Sales.delete('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Service.remove(id);
    res.status(OK).json(data);
  } catch (err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data',
        message: 'Wrong sale ID format' }});
  }
}));

module.exports = Sales;
