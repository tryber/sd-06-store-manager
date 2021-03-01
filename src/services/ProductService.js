const Product = require('../models/Product');

const create = async (name, quantity) => {
  return await Product.createNewProduct(name, quantity);
};

const getName = async (name) => {
  return await Product.getNameProduct(name);
};


module.exports = {
  create,
  getName
};
