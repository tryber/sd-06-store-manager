const { getByName, getById } = require('../models/ProductsModel');
const zero = 0;
const five = 5;
const vinteequatro = 24;
const UNPROCESSABLE = 422;

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  if (!name || name.length < five) return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    }
  });

  if (!quantity || quantity < zero || quantity === zero) {
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
      message: '"quantity" must be a number'
    }
  });
  next();
};

const validateName = async (req, res, next) => {
  const { name } = req.body;
  const result = await getByName(name);
  if (result) return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }
  });
  next();
};

const getByIdMid = async (req, res, next) => {
  const { id } = req.params;
  if (id.length < vinteequatro) return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  });
  next();
};

module.exports = {
  validateName,
  validateProduct,
  getByIdMid,
};
