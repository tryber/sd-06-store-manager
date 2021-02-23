const { findByName } = require('../models/store');

const validateCreate = async (req, res, next) => {
  const { name, quantity } = req.body;
  const checkName = await findByName(name);
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
  if (checkName > zero) return res.
    status(err).
    json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
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

module.exports = {
  validateCreate
};
