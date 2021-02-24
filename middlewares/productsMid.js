const { getByName } = require('../models/ProductsModel');
const FIVE = 5;
const ZERO = 0;
const UNPROCESSABLE = 422;

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  if (!name || name.length < FIVE) return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 6 characters long',
    }
  });

  if (!quantity || quantity < ZERO || quantity === ZERO) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  };

  if (!Number.isInteger(quantity)) return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 6 characters long'
    }
  });

  next();
};

const validateName = async (req, res, next) => {
  const { name } = req.body;
  const result = await getByName(name);
  if(result) return res.status(UNPROCESSABLE).json({ err: {
    code: 'invalid_data',
    message: 'Product already exists'
  }
  });

  next();
};

module.exports = {
  validateProduct,
  validateName
};