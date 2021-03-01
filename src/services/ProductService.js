const Product = require('../models/Product');
require('../../.env');

const getAll = async () => {
  return await Product.getAll();
};

const findById = async (id) => {
  const product = await Product.findById(id);
  
  return product;
};

const create = async (name, quantity) => {
  const product = await Product.create(name, quantity);
  
  return product;
};

module.exports = {
  getAll,
  create,
  findById,
};
