const SalesModel = require('../models/SalesModel');

const getAllSalesService = async () => {
  const allSales = await SalesModel.getAllSales();
  return allSales;
};

const createSaleService = async (element) => {
  const tudo = await SalesModel.createSale(element);
  return tudo;
};

module.exports = {
  getAllSalesService,
  createSaleService
};
