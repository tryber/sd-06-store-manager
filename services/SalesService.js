const Sales = require('../models/Sales');

const getAll = async () => {
  return await Sales.getAll();
};

const getById = async (id) => {
  return await Sales.getById(id);
};

const create = async (arraySales) => {
  
  return await Sales.create(arraySales);
};

module.exports = {
  getAll,
  getById,
  create
};