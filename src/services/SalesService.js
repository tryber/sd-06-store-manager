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

const update = async (id, productId, quantity) => {
  await Sales.updateSales(id, productId, quantity);

  return await Sales.getByIdSales(id);
};

const remove = async (id) => {
  await Sales.deleteSales(id);

  return await Sales.getByIdSales(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};
