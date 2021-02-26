const Sales = require('../models/Sales');
const saleDataValidation = require('./saleDataValidation');
const saleIDValidation = require('./saleIDValidation');
const saleExists = require('./saleExists');

const getAll = async () => {
  return await Sales.getAll();
};

const findById = async (id) => {
  await saleExists(id);
  await saleIDValidation(id);
  return await Sales.findById(id);
};

const create = async (itensSold) => {
  await saleDataValidation(itensSold);
  const sale = await Sales.create(itensSold);
  return sale;
};

const update = async (id, sale) => {
  await saleExists(id);
  await saleIDValidation(id);
  await saleDataValidation(sale);
  return await Sales.update(id, sale);
};

const remove = async (id) => {
  await saleIDValidation(id);
  await saleExists(id);
  return await Sales.remove(id);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove
};