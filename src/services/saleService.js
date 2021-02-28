const saleModel = require('../models/SaleModel');
const { throwError } = require('../utils/errorHandler');
const { status, errors } = require('../utils/status');
// const { get } = require('frisby');

const createSale = async (sale) => {
  const insertedId = await saleModel.createSale(sale);

  const createdSale = {
    _id: insertedId,
    itensSold: sale,
  };

  return createdSale;
};

module.exports = {
  createSale,
};
