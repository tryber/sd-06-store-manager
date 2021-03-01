const Sales = require('../models/Sales');

const create = async (objectSales) =>
  await Sales.createNewSale(objectSales);

module.exports = {
  create,
};
