const errorMessage = require('../utils/errors');
const { verifyName } = require('../models/ProductsModel');

const INVALID = 422;
const NAME_LENGTH = 5;
const LENGTH_ERROR = '"name" length must be at least 5 characters long';
const ALREADY_ERROR = 'Product already exists';
const TYPEOF_ERROR = '"quantity" must be a number';
const LARGER_THAN_ERROR = '"quantity" must be larger than or equal to 1';

const validateProducts = async (res, name, quantity) => {
  if (name.length < NAME_LENGTH) res.status(INVALID).json(errorMessage(LENGTH_ERROR));
  if (await verifyName(name)) res.status(INVALID).json(errorMessage(ALREADY_ERROR));
  if (typeof quantity !== 'number') res.status(INVALID).json(errorMessage(TYPEOF_ERROR));
  if (quantity < 1) res.status(INVALID).json(errorMessage(LARGER_THAN_ERROR));
};

module.exports = validateProducts;
