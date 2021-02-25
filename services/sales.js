// const { error, magicNumbers } = require('../utils/dictionary');
const { utils } = require('../models');
const { error } = require('../utils/dictionary');
const { validateSales } = require('../utils/validators');

const createSale = async (itensSold) => {
  await validateSales(itensSold);
  return utils.insertToDb('sales', { itensSold });
};

const getSales = async (id) => {
  const salesList = await utils.queryFromDb('sales', id);
  if (!salesList) throw new Error(error.invalidSale);
  return salesList;
};

module.exports = {
  createSale,
  getSales,
};
