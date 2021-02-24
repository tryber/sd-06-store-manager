const models = require('../models/SalesModel');
const { throwError } = require('../errorHandler/errorHandler');
const {status, errorMessages} = require('../errorHandler/utils/status');
const { get } = require('frisby');

const registerSale = async (products) => {

  const insertedId = await models.registerSale(products);

  const responsePayload = {
    _id: insertedId,
    itensSold: products,
  };

  return responsePayload;
};

const getAll = async () => {
  const sales = await models.getAll();

  const responsePaload = {sales};

  return responsePaload;
};

const getById = async (id) => {
  const sale = await models.getById(id);

  return sale;
};

const updateSale = async (id, sale) => {
  const nModified = await models.updateSale(id, sale);

  if(nModified === 1) {
    const responsePayload = {
      _id: id,
      itensSold: sale,
    };

    return responsePayload;
  }


};

const deleteSale = async (id) => {
  
  const deletedSale = await getById(id);
  
  if(!deletedSale) {
    throw new throwError(status.notFound, errorMessages.wrongSaleID);
  }
  
  await models.deleteSale(id);

  return deletedSale;
};

module.exports = {
  registerSale,
  getAll,
  getById,
  updateSale,
  deleteSale
};
