const Sales = require('../model/SalesModel');

const registerSale = async (productData) => {
  return Sales.registerSale(productData);
};

const getAll = async () => {
  return Sales.getAll();
};

const getById = async (id) => {
  return Sales.getById(id);
};

module.exports = {
  registerSale,
  getAll,
  getById,
};
