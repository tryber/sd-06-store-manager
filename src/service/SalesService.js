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

// // Remove sale
// const remove = async (id) => {
//   const sale = await sale.findById(id);
//   if (sale) {
//     sale.remove(id);
//     return { status: 'OK', sale};
//   }
//   return { status: 'NOK', message: 'Wrong id format' };
// };


// // Get sale By Name
// const getByname = async (name) => {
//   return await sale.findByName(name);
// };

// // Check Exist sale, search by name
// const existsaleName = async (name) => {
//   const sale = await getByname(name);
//   return sale;
// };

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
  // remove,
};
