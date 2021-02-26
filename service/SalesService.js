const SalesModel = require('../models/SalesModel');
const getAllSalesService = async () => {
  const allSales = await SalesModel.getAllSales();
  return allSales;
};
const createSaleService = async (element) => {
  const tudo = await SalesModel.createSale(element);
  return tudo;
};
const getBySalesIdService = async (id) => {
  const sales = await SalesModel.getBySalesId(id);
  return sales;
};
const deleteSaleService = async (id) => {
  return await SalesModel.deleteSale(id);
};
module.exports = {
  getAllSalesService,
  createSaleService,
  getBySalesIdService,
  deleteSaleService,
};
