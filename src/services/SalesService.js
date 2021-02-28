const { ObjectId } = require('mongodb');
const Sales = require('../models/Sales');

const isLessThanZero = (field) => {
  const zero = 0;
  return !field || field <= zero;
};
const isTypeNumber = (field) => typeof(field) === 'number';

const isQuantityValid = (quantity) => {
  switch (true) {
  case !quantity: return false;
  case !isTypeNumber(quantity): return false;
  case isLessThanZero(quantity): return false;
  case !Number.isInteger(quantity): return false;

  default: return true;
  }
};

const areSaleDataValid = (itensSold) => {
  const areItemsValid = itensSold.map(item => {
    const {productId, quantity} = item;
  
    if (!isIdValid(productId)) return false;
    if (!isQuantityValid(quantity)) return false;
  });

  if(areItemsValid.some(item => item === false)) return false;
    
  return true;
};

const create = async (itensSold) => {
  if (!areSaleDataValid(itensSold)) return false;

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

const update = async (id, itensSold) => {
  if (!isIdValid(id)) return false;
  if(!areSaleDataValid(itensSold)) return false;

  return await Sales.update(id, itensSold);
};

const remove = async (id) => {
  const sale = await findById(id);

  if (!sale) return null;

  await Sales.remove(id);

  return sale;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove
};