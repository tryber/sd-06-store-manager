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

const updateSale = async (id, body) => {
  await getSales(id);
  await validateSales(body);
  return utils.updateDb('sales', id, { itensSold: body });
};

module.exports = {
  createSale,
  getSales,
  updateSale,
};
