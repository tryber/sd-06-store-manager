const model = require('../models/productModel');

const { ERROR_MESSAGE: {
  productAlreadyExists,
  invalidNameLength,
  zeroQuantityNotAllowed,
  invalidQuantityField
} } = require('../utils/dictionary');

const ZERO = 0;
const resultNameRegex = (name) => (/^([A-Z]\s*){5,}/i).test(name);

module.exports = async (name, quantity, update) => {
  if (!update) {
    const productByName = await model.getByName(name);
    if (productByName) throw productAlreadyExists;
  }

  if (!resultNameRegex(name)) throw invalidNameLength;
  if (quantity <= ZERO) throw zeroQuantityNotAllowed;
  if (typeof quantity === 'string') throw invalidQuantityField;
};
