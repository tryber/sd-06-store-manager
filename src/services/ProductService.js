const Product = require('../models/Product');

const create = async (name, quantity) =>
  await Product.createNewProduct(name, quantity);

const getName = async (name) =>
  await Product.getNameProduct(name);

const getAll = async () =>
  await Product.getAllProducts();

const getById = async (id) =>
  await Product.getByIdProduct(id);

const update = async (id, name, quantity) => {
  await Product.updateProduct(id, name, quantity);
  return await Product.getByIdProduct(id);
};

module.exports = {
  create,
  getName,
  getAll,
  getById,
  update
};
