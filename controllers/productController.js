const { Router } = require('express');

const services = require('../services/productService');

const { STATUS_CODES: { OK, CREATED } } = require('../utils/dictionary');

const product = Router();

product.get('/', async (req, res) => {
  const products = await services.getAll();
  res.status(OK).json({ products });
});

product.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const productById = await services.getById(id);

    res.status(OK).json(productById);
  } catch (err) {
    next(err);
  }
});

product.post('/', async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await services.create(name, quantity);

    res.status(CREATED).json(newProduct);
  } catch(err) {
    next(err);
  }
});

product.put('/:id', async (req, res, next) => {
  try {
    const { body: { name, quantity }, params: { id } } = req;
    const updateProduct = await services.updateById(id, name, quantity);

    res.status(OK).json(updateProduct);
  } catch(err) {
    next(err);
  }
});

product.delete('/:id', async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const deletedProduct = await services.deleteById(id);

    res.status(OK).json(deletedProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = product;
