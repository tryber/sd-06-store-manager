const { Sales } = require('../models');
const MIN_SALE = 1;
const STATUS_422 = 422;
const err = { err:
  { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };


const middlewareVerification = async (response, sale) => {
  sale.forEach((product) => {
    if(product.quantity < MIN_SALE || !Number.isInteger(product.quantity)) {
      return response.status(STATUS_422).json(err);
    }
  });
  return null;
};

const salesAdded = async (products) => {
  return await Sales.addSales(products);
};

module.exports = {
  salesAdded,
  middlewareVerification,
};
