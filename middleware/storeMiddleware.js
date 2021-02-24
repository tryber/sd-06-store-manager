const { findByName, findById } = require('../models/store');
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

module.exports = {
  validateCreate,
  rightId,
  nameExist
};
