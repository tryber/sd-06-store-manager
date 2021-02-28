const Product = require('../models/Product');

const minQuantity = 0;
const minLength = 5;

const validation = async(name, quantity) => {
  nameExists = await Product.findByName(name);
  const error = {
    err: {
      code: 'invalid_data', 
    }
  };
  const { err } = error;

  if(name.length < minLength) {
    err.message = '"name" length must be at least 5 characters long';
    return error;
  }

  if(nameExists !== null) {
    err.message = 'Product already exists';
    return error;
  }

  if(quantity <= minQuantity) {
    err.message = '"quantity" must be larger than or equal to 1';
    return error;
  }

  if(!Number(quantity)) {
    err.message = '"quantity" must be a number';
    return error;
  }
};

const create = async (name, quantity) => {
  const notValid = await validation(name, quantity);
  if (notValid) return notValid;

  return await Product.create(name, quantity);
};

module.exports = {
  create
};