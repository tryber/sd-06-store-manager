const Products = require('../models/Products');

const create = async (name, quantity) => {
  const nameLength = 5;
  const zero = 0;
  const isNameAlreadyUsed = await findByName(name);

  if (!name || name.length < nameLength) {
    return {message: '"name" length must be at least 5 characters long'};
  };

  if (isNameAlreadyUsed) {
    return {message: 'Product already exists'};
  };

  if ((!quantity && quantity !== zero) || typeof(quantity) !== 'number') {
    return {message: '"quantity" must be a number'};
  };

  if (!quantity || quantity <= zero || !Number.isInteger(quantity)) {
    return {message: '"quantity" must be larger than or equal to 1'};
  };

  return await Products.create(name, quantity);
};

const findByName = async (name) => {
  return await Products.findByName(name);
};

const getAll = async () => {
  const products = await Products.getAll();
  return products;
};

const findById = async (id) => {
  return await Products.findById(id);
};

module.exports = {
  create,
  getAll,
  findById
};