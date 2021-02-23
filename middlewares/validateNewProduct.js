const { findByName } = require('../models/Products');

const UNPROCESSABLE = 422;
const nameMinLength = 5;
const zero = 0;

module.exports = async (req, res, next) => {
  const { name, quantity } = req.body;

  if (
    (!name || typeof name !== 'string') ||
    (typeof name === 'string' && name.length < nameMinLength)
  ) return res.status(UNPROCESSABLE).send({
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    }
  });

  const findName = await findByName(name);
  if (findName !== null) return res.status(UNPROCESSABLE).send({
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }
  });

  if (
    (!quantity && quantity !== zero) ||
    (typeof quantity !== 'number')
  ) return res.status(UNPROCESSABLE).send({
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  });

  if (!quantity || quantity <= zero) return res.status(UNPROCESSABLE).send({
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    }
  });

  next();
};