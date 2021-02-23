const ProductsModel = require('../model/ProductsModel');

const createProduct = async (name, quantity) => {
  return ProductsModel.createProduct(name, quantity);
};

const findProductByName = async (name) => {
  return ProductsModel.findProductByName(name);
};

const checkNameSize = (name) => {
  const cinco = 5;

  if(name.length < cinco) {
    return false;
  }
  return true;
};

const checkQuantityLessThanZero = (quantity) => {
  const zero = 0;

  if(quantity < zero) {
    return false;
  }
  return true;
};

const checkQuantityEqualZero = (quantity) => {
  const zero = 0;

  if(quantity === zero) {
    return false;
  }
  return true;
};

const checkQuantityString = (quantity) => {
  if(typeof quantity === 'string') {
    return false;
  }
  return true;
};

module.exports = {
  createProduct,
  findProductByName,
  checkNameSize,
  checkQuantityLessThanZero,
  checkQuantityEqualZero
};
