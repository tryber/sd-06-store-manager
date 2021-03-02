const { ObjectId } = require('mongodb');
const Model = require('../models/salesModel');

const notIsNumber = (value) => (typeof value !== 'number');
const lessThanEqual = (value, min) => (value <= min);
const ZERO = 0;
const isIdValid = (id) => ObjectId.isValid(id);

const registerManySales = async (itensSold ) => {
  const quantityLessThanOrEqualZero = itensSold
    .some((el) => lessThanEqual(el.quantity, ZERO));

  if (quantityLessThanOrEqualZero) {
    return {message: 'Wrong product ID or invalid quantity'};
  };
  
  const quantityNotIsNumber = itensSold.some((el) => notIsNumber(el.quantity));
  if (quantityNotIsNumber) return {message: 'Wrong product ID or invalid quantity'};
  
  const { insertedId } = await Model.registerManySales(itensSold );
  return {
    _id: insertedId,
    itensSold
  };
};

const findAllSales = async () => await Model.findAllSales();

const findById = async (id) => {
  if (!isIdValid(id)) return {message: 'Sale not found'};

  const findSalesById = await Model.findById(id);

  if (!findSalesById) return {message: 'Sale not found'};

  return findSalesById;
};

const updateSale = async (id, itensSold) => {
  const quantityLessThanOrEqualZero = itensSold
    .some((el) => lessThanEqual(el.quantity, ZERO));

  if (quantityLessThanOrEqualZero) {
    return {message: 'Wrong product ID or invalid quantity'};
  };

  const quantityNotIsNumber = itensSold.some((el) => notIsNumber(el.quantity));
  if (quantityNotIsNumber) return {message: 'Wrong product ID or invalid quantity'};

  await Model.updateSale(id, itensSold);
  return {
    _id: id,
    itensSold,
  };
};

module.exports = {
  registerManySales,
  findAllSales,
  findById,
  updateSale,
};
