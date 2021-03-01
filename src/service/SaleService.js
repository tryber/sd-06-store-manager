const SaleModel = require('../model/SaleModel');

const createSale = async (sale) => {
  return await SaleModel.createSale(sale);
};

const findAllSales = async () => {
  return await SaleModel.findAllSales();
};

const findSaleById = async (id) => {
  return await SaleModel.findSaleById(id);
};

module.exports = {
  createSale,
  findAllSales,
  findSaleById,
};
