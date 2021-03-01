const Sale = require('../models/Sale');

const minQuantity = 0;
const validation = (quantity) => {
  const error = {
    err: {
      code: 'invalid_data', 
    }
  };
  const { err } = error;
  if(quantity <= minQuantity || !Number(quantity)) {
    err.message = 'Wrong product ID or invalid quantity';
    return error;
  }
};

const create = async (array) => {
  let notValid;
  array.forEach(element => {
    const { quantity } = element;
    notValid = validation(quantity);
  });
  if (notValid) return notValid;
  return await Sale.create(array);
};

module.exports = {
  create
};
