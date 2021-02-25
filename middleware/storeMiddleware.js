const { findByName, findById, findSalesById } = require('../models/store');
const { ObjectId } = require('mongodb');

const validateCreate = async (req, res, next) => {
  const { name, quantity } = req.body;
  const nameArray = name.split('');
  const err = 422;
  const minimo = 5;
  const zero = 0;

  if (nameArray.length < minimo) return res.
    status(err).
    json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });

  if (quantity <= zero) return res.
    status(err).
    json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  if (typeof quantity !== 'number') return res.
    status(err).
    json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });

  next();
};
const checkQuantitySold = (req, res, next) => {
  const [{ quantity }] = req.body;
  const err = 422;
  const zero = 0;

  if (quantity <= zero || typeof quantity !== 'number') return res.
    status(err).
    json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  next();
};

const nameExist = async (req, res, next) => {
  const { name } = req.body;
  const checkName = await findByName(name);
  const err = 422;
  const zero = 0;

  if (checkName > zero) return res.
    status(err).
    json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  next();
};

const rightId = async (req, res, next) => {
  const { id } = req.params;
  const err = 422;
  if (!ObjectId.isValid(id)) {
    return res.status(err)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  const check = await findById(id);
  if (!check) {
    return res.status(err)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  next();
};
const salesId = async (req, res, next) => {
  const { id } = req.params;
  const err = 404;
  if (!ObjectId.isValid(id)) {
    return res.status(err)
      .json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  const check = await findSalesById(id);
  if (!check) {
    return res.status(err)
      .json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  next();
};
const rightIdSales = async (req, res, next) => {
  const { id } = req.params;
  const err = 422;
  if (!ObjectId.isValid(id)) {
    return res.status(err)
      .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
  const check = await findSalesById(id);
  if (!check) {
    return res.status(err)
      .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
  next();
};
module.exports = {
  validateCreate,
  rightId,
  nameExist,
  checkQuantitySold,
  salesId,
  rightIdSales
};
