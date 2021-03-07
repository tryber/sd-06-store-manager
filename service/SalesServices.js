const { postSale } = require('../models/salesModel');

const newSale = async (sale) => {
  return postSale(sale);
};

module.exports = {
  newSale,
};
