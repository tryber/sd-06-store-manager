const Product = require('../models/Product');

const minQuantity = 0;
const minLength = 5;

const validation = async(obj) => {
  nameExists = await Product.findByName(obj.name);
  const error = {
    err: {
      code: 'invalid_data', 
    }
  };
  const { err } = error;

  if(obj.name && obj.name.length < minLength) {
    err.message = '"name" length must be at least 5 characters long';
    return error;
  }

  if(nameExists !== null && obj.create === true) {
    err.message = 'Product already exists';
    return error;
  }

  if(obj.quantity <= minQuantity) {
    err.message = '"quantity" must be larger than or equal to 1';
    return error;
  }

  if(obj.quantity &&  !Number(obj.quantity)) {
    err.message = '"quantity" must be a number';
    return error;
  }
  if(obj.id === false) {
    err.message = 'Wrong id format';
    return error;
  }
};

const create = async (name, quantity) => {
  const notValid = await validation({ name, quantity, create: true });
  if (notValid) return notValid;

  return await Product.create(name, quantity);
};

const change = async (id, name, quantity) => {
  const notValid = await validation({ name, quantity, create: false });
  if (notValid) return notValid;

  return await Product.change(id, name, quantity);
};

const getById = async (id) => {
  try {
    return await Product.getById(id);
  }
  catch (e) {
    return await validation({ id: false });
  }
};

module.exports = {
  create,
  getById,
  change
};