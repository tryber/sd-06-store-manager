const { ObjectId } = require('mongodb');
const Products = require('../models/Products');

const productValidation = async (name, quantity) => {
  const nameLength = 5;
  const zero = 0;

  if (!name || name.length < nameLength) {
    return {message: '"name" length must be at least 5 characters long'};
  };

  if ((!quantity && quantity !== zero) || typeof(quantity) !== 'number') {
    return {message: '"quantity" must be a number'};
  };

  if (!quantity || quantity <= zero || !Number.isInteger(quantity)) {
    return {message: '"quantity" must be larger than or equal to 1'};
  };

  return null;
};

const create = async (name, quantity) => {
  const isDataInvalid = await productValidation(name, quantity);
  const isNameAlreadyUsed = await findByName(name);

  if (isNameAlreadyUsed) {
    return {message: 'Product already exists'};
  };

  if (isDataInvalid) return isDataInvalid;

  return await Products.create(name, quantity);
};

const findByName = async (name) => {
  return await Products.findByName(name);
};

const getAll = async () => {
  const products = await Products.getAll();
  return products;
};

const isIdValid = (id) => ObjectId.isValid(id);

const findById = async (id) => {
  if (!isIdValid(id)) return { message: 'Wrong id format'};
  
  const productById = await Products.findById(id);

  if (!productById) return { message: 'Wrong id format' };

  return productById;
};

const update = async (id, name, quantity) => {
  const isDataInvalid = await productValidation(name, quantity);

  if (isDataInvalid) return isDataInvalid;

  return await Products.update(id, name, quantity);
};

const remove = async (id) => {
  const product = await findById(id);

  if (product.message) return product;

  await Products.remove(id);

  return product;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
  isIdValid
};