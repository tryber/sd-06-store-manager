const sales = require('../Models/sales');

const createSaleService = async (sale) => {
  return sales.createSale(sale);
};

module.exports = {
  createSaleService
};