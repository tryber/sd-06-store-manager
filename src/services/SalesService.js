const Products = require('../services/ProductsService');
const Sales = require('../models/Sales');
const { ObjectId } = require('mongodb');

const SalesValidation = async (itensSold) => {
  let isAnyError = '';

  itensSold.forEach(item => {
    const {productId, quantity} = item;
    const zero = 0;
    const productById = Products.isIdValid(productId);
    const errorMsg = { message: 'Wrong product ID or invalid quantity' };
  
    if (!productById) isAnyError = errorMsg;
    
    if ((!quantity && quantity !== zero) || typeof(quantity) !== 'number') {
      isAnyError = errorMsg;
    }
    
    if (!quantity || quantity <= zero || !Number.isInteger(quantity)) {
      isAnyError = errorMsg;
    }
  });
  
  if (isAnyError.message) return isAnyError;
  
  return null;

  
};

const create = async (itensSold) => {
  const isDataInvalid = await SalesValidation(itensSold);

  console.log(isDataInvalid);

  if (isDataInvalid) return isDataInvalid;

  return await Sales.create(itensSold);
};

const getAll = async () => {
  const sales = await Sales.getAll();
  return sales;
};

const isIdValid = (id) => ObjectId.isValid(id);

const findById = async (id) => {
  if (!isIdValid(id)) return null;
  
  const salesById = await Sales.findById(id);

  return salesById;
};

module.exports = {
  create,
  getAll,
  findById
};