const { postSale, getAllSales, findSaleById } = require('../models/salesModel');

const newSale = async (sale) => {
  return postSale(sale);
};

const findAllSales = async () => {
  return getAllSales();
};

const findSale = async (id) => {
  return findSaleById(id);
};

module.exports = {
  newSale,
  findAllSales,
  findSale
};
