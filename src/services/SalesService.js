const Sales = require('../models/Sales');

const create = async (objectSales) =>
  await Sales.createNewSale(objectSales);

const getAll = async () =>
  await Sales.getAllSales();

const getById = async (id) =>
  await Sales.getByIdSales(id);

module.exports = {
  create,
  getAll,
  getById
};
