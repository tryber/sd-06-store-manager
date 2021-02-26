const Sales = require('../models/Sales');
const helpers = require('./validations');
const type = 'SALE';
const action = 'DELETE';

const getAll = async () => {
  const result = await Sales.getAll();
  const joinResult = { sales: result };

  return joinResult;
};

const getById = async (id) => {
  const validateId = await helpers.idValidation(id, type);

  return validateId;
};

const updateSale = async (id, productId, quantity) => {
  const bodyArr = [ { productId, quantity} ];
  const qntIsError = helpers.quantityValidation(bodyArr);
  const validateId = await helpers.idValidation(id, type);
  
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

const deleteSale = async (id) => {
  const validateId = await helpers.idValidation(id, type, action);
  if (!validateId.payload) await Sales.deleteSale(id);;
  return validateId;
};

module.exports = {
  getAll,
  insertSale,
  getById,
  updateSale,
  deleteSale
};
