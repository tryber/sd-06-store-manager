const Sales = require('../models/Sales');
const ProductServices = require('../services/ProductServices');
const validation = require('../services/validation');
const {generateError} = require('../utils/errors');
const {unProcessableEntity, ok} = require('../utils/status');

const getAll = async () => {
  return await Sales.getAll();
};

const getOne = async (id) => {
  try {
    const itensSold = await Sales.getOne(id);
    return {itensSold};
  } catch {
    return generateError(unProcessableEntity,
      'invalid_data', 'Wrong product ID or invalid quantity'); 
  }
};

const validateEntry = async (itensSold) => {
  const validateSales = itensSold.map(async (item) => {
    const {err} = await ProductServices.getOne(item.productId);
    if (err) throw err;
    await validation.SalesSchema.validate(item);
  });
  
  try {
    await Promise.all(validateSales);    
    return {};
  } catch (err) {
    return generateError(unProcessableEntity,
      'invalid_data', 'Wrong product ID or invalid quantity');
  }  
};

const createOne = async (itensSold) => {
  
  const {err} = await validateEntry(itensSold);
  console.log(err, 'err');
  if(err) return {err};

  const {insertedId} = await Sales.create(itensSold);

  return {
    sale: {
      ...itensSold, insertedId
    }
  };
};



const updateOne = async (id, productId, quantity) => {
};

const deleteOne = async (id) => {
  
};

module.exports = {
  getAll, getOne, createOne,updateOne, deleteOne
};