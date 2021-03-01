const Sales = require('../models/Sales');

const create = async (objectSales) => {
  return await Sales.createNewSale(objectSales);
};

module.exports = {
  create
};
