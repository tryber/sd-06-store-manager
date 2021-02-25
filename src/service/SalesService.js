const { ObjectId } = require('mongodb');
const Sales = require('../model/Sales');

// Return all sales
const getAll = async () => {
  return await Sales.getAll();
};

// Return sale by ID
const findById = async (id) => {
  if (validateId(id)) {
    const result = await Sales.findById(id);
    if (result) return { status: 'OK', result};
  }
  return { status: 'NOK', result: 'Sale not found' };
};

// Add new sale
const create = async (itensSold) => {
  if (validateSale(itensSold)) {
    const result = await Sales.create(itensSold);
    return { status: 'OK', result };
  }
  return { status: 'NOK', result: 'Wrong product ID or invalid quantity' };
};

// // Update sale
const update = async (id, itensSold) => {
  if (validateSale(itensSold) && validateId(id)) {
    const result = await Sales.update(id, itensSold);
    return { status: 'OK', result };
  } 
  return { status: 'NOK', result: 'Wrong product ID or invalid quantity' };
};

// Remove sale
const remove = async (id) => {
  const result = await Sales.findById(id);
  if (result) {
    Sales.remove(id);
    return { status: 'OK', result};
  }
  return { status: 'NOK', result: 'Wrong sale ID format' };
};

// Validation Id
const validateId = (id) => {
  const lengthId = 24;
  return (id.length === lengthId && id !== undefined);
};

// Validation Sale fields
const validateSale = (itensSold) => {
  const ZERO = 0;
  let resultOk = true;
  itensSold.forEach(item => {
    if (!item.quantity || item.quantity < ZERO 
      || item.quantity === ZERO || !Number.isInteger(item.quantity)) {
      resultOk = false;
    };
  });
  return resultOk;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
