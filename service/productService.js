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

module.exports = {
  createProduct,
  ProductList,
  findById
};
