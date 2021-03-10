const sales = require('../models/sales');

const createSale = async (sale) => await sales.insertSale(sale);

const allSales = async () => await sales.getAll();

const saleById = async (id) => await sales.getById(id);

const updateSaleInfo = async (id, sale) => await sales.updateOne(id, sale);

module.exports = {
  createSale,
  allSales,
  saleById,
  updateSaleInfo,
};