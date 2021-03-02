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

const updateSaleService = async (id, itensSold) => {
  return sales.updateSale(id, itensSold);
};

const deleteSaleService = async (id) => {
  return sales.deleteSale(id);
};

module.exports = {
  createSaleService,
  listSalesService,
  saleByIdService,
  updateSaleService,
  deleteSaleService
};