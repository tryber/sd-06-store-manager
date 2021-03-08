const {
  findProductByName
} = require('../models/querys');

const magicNumberzero = 0;
const magicNumbercinco = 5;
const statusError = 422;

const validateNameGreater5 = (req, res, next) => {
  const { name } = req.body;
  if(name.length < magicNumbercinco) {
    return res.status(statusError).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
  next();
};

const validateProductAlredyExist = async (req, res, next) => {
  const { name } = req.body;
  const findName = await findProductByName(name);
  if(findName !== null) {
    return res.status(statusError).json({
      err: {
        code: 'invalid_data',
        message: 'Product alredy exists'
      }
    });
  }
  next();
};

const validateQuantityGreaterEqual0 = (req, res, next) => {
  const { quantity } = req.body;
  if(quantity < magicNumberzero || quantity === magicNumberzero) {
    return res.status(statusError).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }
  next();
};

const validateQuantityNotString = (req, res, next) => {
  const { quantity } = req.body;
  const isString = typeof(quantity);
  if(isString === 'string') {
    return res.status(statusError).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
  }
  next();
};

module.exports = {
  validateNameGreater5,
  validateProductAlredyExist,
  validateQuantityGreaterEqual0,
  validateQuantityNotString
};
