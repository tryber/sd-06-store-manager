const { response } = require('express');
const productsModels = require('../models/productsModels');

const compare ={
  minSize: 5,
  zeroQuantity: 0,
};

const status = {
  OK: 200,
  CREATED: 201,
  UNPROCESSABLE: 422,
};

const message = {
  nameLength: '"name" length must be at least 5 characters long',
  alreadyExists: 'Product already exists',
  greaterThanZero: '"quantity" must be larger than or equal to 1',
  mustBeNumber: '"quantity" must be a number',
};

const messageError = (code, message) => ({ 
  code,
  err: {
    code: 'invalid_data',
    message
  }
});

// Funções de validação;
const minLengthOf = (value, number) => (value.length < number);
const greaterThan = (value, number) => (Math.floor(value) <= number);
const mustBeNumber = (value) => (typeof value !== 'number');
const productExists = async (value) => {
  const productFound = await productsModels.getByName(value);
  if (productFound !== null) return true;
};

// funções da camada de serviço;
const getAllProducts = async () => await productsModels.getAll();

const createNewProduct = async (name, quantity) => {
  // console.log('quantity', quantity);
  // console.log('productExists(name)', await productExists(name));
  switch (true) {
  case minLengthOf(name, compare.minSize):
    return messageError(status.UNPROCESSABLE, message.nameLength);
  case greaterThan(quantity, compare.zeroQuantity):
    return messageError(status.UNPROCESSABLE, message.greaterThanZero);
  case mustBeNumber(quantity):
    return messageError(status.UNPROCESSABLE, message.mustBeNumber);
  case await productExists(name):
    return messageError(status.UNPROCESSABLE, message.alreadyExists);
  default:
    break;
  }

  const product = await productsModels.createNewProduct(name, quantity);
  
  
  return {
    code: status.CREATED,
    product
  };
};

const deleteAllProducts = async () => {
  await productsModels.deleteAllProducts();
  // return response.status(status.OK).json({ message: 'produtos apagados'});
  return {
    code: status.OK,
    message: 'Collection apagada'
  };
};

module.exports = {
  getAllProducts,
  createNewProduct,
  deleteAllProducts,
};
