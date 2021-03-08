const sales = require('../models/sales');

const createSale = async (sale) => await sales.insertSale(sale);

module.exports = {
  createSale,
};