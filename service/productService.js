const Store = require('../models/store');
const { ObjectId } = require('mongodb');

const createProduct = async (product) => {
  return await Store.createProduct(product);
};

const ProductList = async () => {
  return await Store.ProductList();
};

const findById = async (id) => {
  return await Store.findById(id);
};
const update = async (id, name, quantity) => {
  return await Store.update(id, name, quantity);
};
const remove = async (id) => {
  return await Store.remove(id);
};
module.exports = {
  createProduct,
  ProductList,
  findById,
  update,
  remove
};
