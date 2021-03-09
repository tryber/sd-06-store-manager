const SalesModels = require('../models/SalesModels');

const {
  compare,
  statusCode,
  message,
  greaterThan,
  mustBeNumber,
  responseWith,
  responseWithNotFound,
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

const getAllSales = async (request, response) => {
  const allSales = await SalesModels.getAllSales();

  return response.status(statusCode.OK).json({ sales: allSales});
};

const getById = async (request, response) => {
  const { id } =  request.params;
  const idNotExist = !id;
  const idNotHexObjectId = (id.length !== compare.hexObjectedId);

  if (idNotExist || idNotHexObjectId) {
    return responseWithNotFound(response);
  }

  const saleFound = await SalesModels.getById(id);

  if (!saleFound) {
    return responseWithNotFound(response);
  }

  return response.status(statusCode.OK).json(saleFound);
};

const updateSale = async (request, response) => {
  const { id } = request.params;
  const idNotHexObjectId = (id.length !== compare.hexObjectedId);
  const itensSold = request.body;
  console.log('itensSold', itensSold);

  if (idNotHexObjectId) {
    responseWith(statusCode.UNPROCESSABLE, message.invalidyQuantity, response);
  }

  itensSold.map((item) => {
    switch (true) {
    case greaterThan(item.quantity, compare.zeroQuantity):
      responseWith(statusCode.UNPROCESSABLE, message.invalidyQuantity, response);
    case mustBeNumber(item.quantity):
      responseWith(statusCode.UNPROCESSABLE, message.invalidyQuantity, response);
    default:
      break;
    }
  });

  await SalesModels.updateSale(id, itensSold);
  response.status(statusCode.OK).json({ _id: id, itensSold });
   
};

const removeSale = async (request, response) => {
  const { id } = request.params;
  const idNotHexObjectId = (id.length !== compare.hexObjectedId);
  
  if (idNotHexObjectId) {
    responseWith(statusCode.UNPROCESSABLE, message.wrongSaleId, response);
  }
  
  const removedSale = await SalesModels.getById(id);

  if (!removedSale) {
    return responseWith(statusCode.UNPROCESSABLE, message.wrongSaleId, response);
  }

  await SalesModels.removeSale(id);

  return response.status(statusCode.OK).json(removedSale);
};

module.exports = {
  registerSale,
  getAllSales,
  getById,
  updateSale,
  removeSale,
};
