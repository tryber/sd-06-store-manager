const Sale = require('../models/Sale');

const minQuantity = 0;
const validation = (obj) => {
  const error = {
    err: {
      code: 'invalid_data', 
    }
  };
  const { err } = error;
  if(obj.id === false) {
    err.code = 'not_found';
    err.message = 'Sale not found';
    return error;
  }
  if(obj.quantity <= minQuantity || !Number(obj.quantity)) {
    err.message = 'Wrong product ID or invalid quantity';
    return error;
  }
};

const create = async (array) => {
  let notValid;
  array.forEach(element => {
    const { quantity } = element;
    notValid = validation({ quantity });
  });
  if (notValid) return notValid;
  return await Sale.create(array);
};

const getById = async(id) => {
  try {
    return await Sale.getById(id);
  }
  catch (e) {
    return validation({ id: false });
  }
};

module.exports = {
  create,
  getById
};
