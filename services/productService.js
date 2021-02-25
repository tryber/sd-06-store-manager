const model = require('../models/productModel');
const productValidate = require('./productValidate');
const productValidateId = require('./productValidateId');

const create = async (name, quantity) => {
  await productValidate(name, quantity, false);
  return await model.create(name, quantity);
};

const getAll = async () => await model.getAll();

const getById = async (id) => {
  await productValidateId(id);
  return await model.getById(id);
};

const updateById = async (id, name, quantity) => {
  await productValidate(name, quantity, true);
  return await model.updateById(id, name, quantity);
};

const deleteById = async (id) => {
  await productValidateId(id);
  return await model.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
