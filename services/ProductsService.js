const Products = require('../models/Products');

const create = async (name, quantity) => {
  const nameLength = 5;
  const zero = 0;
  const isNameAlreadyUsed = await findByName(name);

  if (!name || name.length < nameLength) {
    return {status: 422, message: '"name" length must be at least 5 characters long'};
  };

  if (isNameAlreadyUsed) {
    return {status: 422, message: 'Product already exists'};
  };

  if ((!quantity && quantity !== zero) || typeof(quantity) !== 'number') {
    return {status: 422, message: '"quantity" must be a number'};
  };

  if (!quantity || quantity <= zero || !Number.isInteger(quantity)) {
    return {status: 422, message: '"quantity" must be larger than or equal to 1'};
  };

  return await Products.create(name, quantity);
};

const findByName = async (name) => {
  return await Products.findByName(name);
};

const getAll = async () => {
  return await Products.getAll();
};

module.exports = {
  create,
  getAll
};