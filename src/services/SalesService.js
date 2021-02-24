const { ObjectId } = require('mongodb');
const Sales = require('../models/Sales');
const helpers = require('./helpers/SalesHelper');

const getAll = async () => {
  const result = await Sales.getAll();
  const joinResult = { sales: result };

  return joinResult;
};

const getById = async (id) => {
  const validateId = await helpers.idValidation(id);
  return validateId;
};

const updateSale = async (id, productId, quantity) => {
  const bodyArr = [ { productId, quantity} ];
  const qntIsError = helpers.quantityValidation(bodyArr);
  const validateId = await helpers.idValidation(id);
  
  if (qntIsError) return qntIsError;
  if (validateId.payload) return validateId;

  await Sales.updateSale(id, productId, quantity);
  const result = await Sales.getById(id);

  return result;
};

const insertSale = async (salesArr) => {
  const qntIsError = helpers.quantityValidation(salesArr);

  if (qntIsError) return qntIsError;
  
  return await Sales.insertSale(salesArr);
};

module.exports = {
  getAll,
  insertSale,
  getById,
  updateSale
};
