const { Router } = require('express');
const rescue = require('express-rescue');
const Service = require('../services/product');
const Product = Router();
const OK = 200;
const CREATED = 201;
const UNPROCESSABLE = 422;

Product.get('/', rescue(async (req, res) => {
  try {
    const data = await Service.getAll();
    res.status(OK).json(data);
  } catch (err) {
    res.status(UNPROCESSABLE).json({ message: err.message });
  }
}));

Product.get('/:id', rescue(async (req, res) => {
  try {
    const data = await Service.getById(req.params.id);
    res.status(OK).send(data);
  } catch (err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' }});
  }
}));

Product.delete('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Service.getById(id);
    await Service.remove(id);
    res.status(OK).json(data);
  } catch (err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' }});
  }
  
}));

Product.post('/', rescue(async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const data = await Service.create(name, quantity);
    res.status(CREATED).json(data);
  } catch (err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data', message: err.message }});
  }
}));

Product.put('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const data = await Service.update(id, name, quantity);
    res.status(OK).json(data);
  } catch(err) {
    res.status(UNPROCESSABLE)
      .json({ err: { code: 'invalid_data', message: err.message }});
  }
}));

module.exports = Product;
