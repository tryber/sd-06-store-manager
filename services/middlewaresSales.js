const {
  createSales,
  findSalesByName
} = require('../models/querysSales');

const magicNumberzero = 0;
const magicNumbercinco = 5;
const status422 = 422;

const validateQuantityGreaterEqual0 = (req, res, next) => {
  const [{ quantity }] = req.body;
  if(quantity < magicNumberzero || quantity === magicNumberzero) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  next();
};

const validateQuantityNotString = (req, res, next) => {
  const [{ quantity }] = req.body;
  const isString = typeof(quantity);
  if(isString === 'string') {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  next();
};

module.exports = {
  validateQuantityGreaterEqual0,
  validateQuantityNotString
};
