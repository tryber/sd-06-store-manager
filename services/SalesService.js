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

const update = async (id, productId, quantity) => {
  
  return Sales.update(id, productId, quantity);
};

const remove = async (id) => {
  return Sales.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};