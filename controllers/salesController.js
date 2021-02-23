const { Router } = require('express');
const rescue = require('express-rescue');
const Sales = require('../services/salesServices');

const SalesRouter = Router();

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE = 422;
const NOT_FOUND = 404;

// GET'S

SalesRouter.get('/', rescue(async (req, res) => {
  const data = await Sales.getAll();
  res.status(OK).json(data);
}));

SalesRouter.get('/:id', rescue(async (req, res) => {
  try {
    const data = await Sales.getById(req.params.id);
    res.status(OK).send(data);
  } catch (err) {
    res.status(NOT_FOUND).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
}));

// POST

SalesRouter.post('/', rescue(async (req, res) => {
  try {
    const data = await Sales.create(req.body);
    res.status(OK).json(data);
  } catch (err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity' }});
  }
}));

// UPDATE

SalesRouter.put('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Sales.update(id, req.body);
    res.status(OK).json(data);
  } catch (err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity' }});
  }
}));

// DELETE

SalesRouter.delete('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Sales.remove(id);
    res.status(OK).json(data);
  } catch (err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data',
        message: 'Wrong sale ID format' }});
  }
}));


module.exports = SalesRouter;