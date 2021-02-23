const Product = require('../models/Product');

const getAll = async () => {
  return await Product.getAll();
};

const findById = async (id) => {
  return await Product.findById(id);
};

const findByName = async (name) => {
  return await Product.findByName(name);
};

const create = async (name, quantity) => {
  const product = await Product.create(name, quantity);
  return product;
};

const update = async (id, name, quantity) => {
  return await Product.update(id, name, quantity);
};

const remove = async (id) => {
  return await Product.remove(id);
};



module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
  findByName,
};