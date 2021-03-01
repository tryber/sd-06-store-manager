const sales = require('../Models/sales');

const createSaleService = async (sale) => {
  return sales.createSale(sale);
};

const listSalesService = async () => {
  return sales.listSales();
};

const saleByIdService = async (id) => {
  return sales.saleById(id);
};

module.exports = {
  createSaleService,
  listSalesService,
  saleByIdService
};