const sales = require('../models/sales');

const create = async (itensSold) => {
  const result = await sales.create(itensSold);

  return result;
};

module.exports = {
  create,
};