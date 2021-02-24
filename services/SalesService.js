const Sales = require('../models/Sales');

const create = async (arraySales) => {
  // console.log(productId,quantity );
  return await Sales.create(arraySales);
};

module.exports = {
  create
};