const SaleModel = require('../model/SaleModel');

const createSale = async (sale) => {
  return await SaleModel.createSale(sale);
};

module.exports = {
  createSale,
};
