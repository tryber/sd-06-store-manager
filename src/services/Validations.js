const Product = require('../models/ProductsModel');

const validationCreate = async (name, quantity) => {
  const nameMin = 5;
  const zero = 0;
  const isNameAlreadyUsed = await Product.findByName(name);

  if (!name || name.length <= nameMin) {
    return {message: '"name" length must be at least 5 characters long'};
  };
  if (isNameAlreadyUsed) {
    return {message: 'Product already exists'};
  };
  if ((!quantity && quantity !== zero) || typeof(quantity) !== 'number'){
    return {message: '"quantity" must be a number'};
  };
  if (!quantity || quantity <= zero || !Number.isInteger(quantity)) {
    return {message: '"quantity" must be larger than or equal to 1'};
  };
  return null;
};

const validationUpdate = async (name, quantity) => {
  const nameMin = 5;
  const zero = 0;

  if (!name || name.length <= nameMin) {
    return {message: '"name" length must be at least 5 characters long'};
  };
  if ((!quantity && quantity !== zero) || typeof(quantity) !== 'number'){
    return {message: '"quantity" must be a number'};
  };
  if (!quantity || quantity <= zero || !Number.isInteger(quantity)) {
    return {message: '"quantity" must be larger than or equal to 1'};
  };
  return null;
};

const validationId = (id) => {
  const idLength = 24;
  if(id.length != idLength) {
    return {message: 'Wrong id format'};
  }
  return null;
};

const validateSale = (itensSold) => {
  const ZERO = 0;
  let result = true;
  itensSold.forEach(item => {
    if (!item.quantity || item.quantity < ZERO
      || item.quantity === ZERO || !Number.isInteger(item.quantity)) {
      result = false;
    };
  });
  return result;
};

module.exports = {
  validationCreate,
  validationUpdate,
  validationId,
  validateSale,
};
