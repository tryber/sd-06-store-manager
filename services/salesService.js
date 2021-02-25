const model = require('../models/salesModel');
const { validateSale, validateSaleId } = require('./salesValidate');

const create = async (sales) => {
  await validateSale(sales);
  return await model.create(sales);
};

const getAll = async () => await model.getAll();
const getById = async (id) => await validateSaleId(id, false);

const updateById = async (id, sale) => {
  await validateSale(sale);
  return await model.updateById(id, sale);
};

const deleteById = async (id) => {
  await validateSaleId(id, true);
  return await model.deleteById(id);
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};
