const SalesModels = require('../models/SalesModels');
const {
  compare,
  statusCode,
  message,
  greaterThan,
  mustBeNumber,
  responseWith,
} = require('./Helpers');

const registerSale = async (request, response) => {
  const itensSold = request.body;
  
  itensSold.map((item) => {
    switch (true) {
    case greaterThan(item.quantity, compare.zeroQuantity):
      return responseWith(statusCode.UNPROCESSABLE, message.invalidyQuantity, response);
    case mustBeNumber(item.quantity):
      return responseWith(statusCode.UNPROCESSABLE, message.invalidyQuantity, response);
    default:
      break;
    }
  });
  
  const registeredSale = await SalesModels.registerSale(itensSold);

  return response.status(statusCode.OK).json(registeredSale);
};

module.exports = {
  registerSale,
};
