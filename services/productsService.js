const Products = require('../models/Products');
const productDataValidation = require('./productDataValidation');
const productIDValidation = require('./productIDValidation');

const getAll = async () => {
  return await Products.getAll();
};

const findById = async (id) => {
  await productIDValidation(id);
  return await Products.findById(id);
};

const create = async (name, quantity) => {
  await productDataValidation(name, quantity);
  const product = await Products.create(name, quantity);
  return product;
};

const update = async (id, name, quantity) => {
  await productIDValidation(id);
  await productDataValidation(name, quantity);
  return await Products.update(id, name, quantity);
};

const remove = async (id) => {
  await productIDValidation(id);
  return await Products.remove(id);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove
};