const Product = require('../models/Product');

const create = async (name, quantity) => {
  return await Product.createNewProduct(name, quantity);
};

const getName = async (name) => {
  return await Product.getNameProduct(name);
};

const getAll = async () => {
  return await Product.getAllProducts();
};

const getById = async (id) => {
  return await Product.getByIdProduct(id);
};



module.exports = {
  create,
  getName,
  getAll,
  getById
};
