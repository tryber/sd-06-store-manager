// const { error, magicNumbers } = require('../utils/dictionary');
const { validateSales } = require('../utils/validators');
const { utils } = require('../models');

const createSale = async (itensSold) => {
  await validateSales(itensSold);
  return utils.insertToDb('sales', { itensSold });
};

module.exports = {
  createSale,
};
