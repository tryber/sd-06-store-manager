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

const removeSale = async (id) => {
  return await SaleModel.removeSale(id);
};

const updateProductInSale = async (id, saleToBeUpdated) => {
  return await SaleModel.updateProductInSale(id, saleToBeUpdated);
};

module.exports = {
  createSale,
  findAllSales,
  findSaleById,
  removeSale,
  updateProductInSale,
};
