const sales = require('../models/sales');

const createSale = async (sale) => await sales.insertSale(sale);

const allSales = async () => await sales.getAll();

const saleById = async (id) => await sales.getById(id);

module.exports = {
  createSale,
  allSales,
  saleById,
};