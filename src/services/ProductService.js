const Product = require('../models/Product');

const getAll = async () => {
  return await Product.getAll();
};

const create = async (name, quantity) => {
  const product = await Product.create(name, quantity);
  
  return product;
};

module.exports = {
  getAll,
  create,
};
