const errorMessage = require('./errors');
const { verifyName } = require('../models/ProductsModel');

const INVALID = 422;
const NAME_LENGTH = 5;
const LENGTH_ERROR = '"name" length must be at least 5 characters long';
const ALREADY_ERROR = 'Product already exists';
const TYPEOF_ERROR = '"quantity" must be a number';
const LARGER_THAN_ERROR = '"quantity" must be larger than or equal to 1';
const ID_ERROR = 'Wrong id format';

const validateProducts = async (res, name, quantity) => {
  if (name.length < NAME_LENGTH) {
    res.status(INVALID).json(errorMessage(LENGTH_ERROR));
    return false;
  }
  if (await verifyName(name)) {
    res.status(INVALID).json(errorMessage(ALREADY_ERROR));
    return false; 
  };
  if (typeof quantity !== 'number') {
    res.status(INVALID).json(errorMessage(TYPEOF_ERROR));
    return false; 
  };
  if (quantity < 1) {
    res.status(INVALID).json(errorMessage(LARGER_THAN_ERROR));
    return false;
  };
  return true;
};

module.exports = {
  validateProducts
};
