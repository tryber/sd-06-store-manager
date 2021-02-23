const rescue = require('express-rescue');
const productModel = require('../models/productModel');

const ok = 200;
const noEntity = 422;
const created = 201;
const zero = 0;
const maxNameLength = 5;
const maxIdLength = 12;

const getAll = rescue(async (_req, res, _next) => {
  const product = await productModel.getAll();
  return res.status(ok).json({ products: product });
});

const getById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  if (id.length < maxIdLength) {
    return res.status(noEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  const product = await productModel.getById(id);
  return res.status(ok).json(product);
});

const deleteById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  if (id.length < maxIdLength) {
    return res.status(noEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  const product = await productModel.getById(id);
  if (product === null) {
    return res.status(noEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  await productModel.deleteById(id);
  return res.status(ok).json(product);
});

const getByName = rescue(async (req, res, _next) => {
  const { name } = req.query;
  const products = await productModel.getByName(name);
  return res.status(ok).json(products);
});

const createProduct = rescue(async (req, res, _next) => {
  const { name, quantity } = req.body;
  const exists = await productModel.getByName(name);
  if (exists.length !== zero) {
    return res.status(noEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  if (name.length < maxNameLength) {
    return res.status(noEntity).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  if (typeof quantity !== 'number') {
    return res.status(noEntity).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  if (quantity <= zero) {
    return res.status(noEntity).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  const products = await productModel.createProduct({ name, quantity });
  return res.status(created).json({ _id: products.insertedId, name, quantity });
});

const updateProduct = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  if (name.length < maxNameLength) {
    return res.status(noEntity).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  if (typeof quantity !== 'number') {
    return res.status(noEntity).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  if (quantity <= zero) {
    return res.status(noEntity).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  const products = await productModel.editProduct(id, name, quantity);
  return res.status(ok).json({ _id: products.insertedId, name, quantity });
});

module.exports = { createProduct, getAll, getByName, getById, updateProduct, deleteById };
