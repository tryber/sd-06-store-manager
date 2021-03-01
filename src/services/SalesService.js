const Sales = require('../models/Sales');

const create = async (objectSales) => {
  return await Sales.createNewSale(objectSales);
};

const getAll = async () => {
  return await Sales.getAllSales();
};

const getById = async (id) => {
  return await Sales.getByIdSales(id);
};


module.exports = {
  create,
  getAll,
  getById
};
