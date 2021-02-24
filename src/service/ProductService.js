const { response } = require('express');
const ProductModel = require('../model/ProductModel');

const createProduct = async (product) => {
  return await ProductModel.createProduct(product);
};

const findProductByName = async (name) => {
  return await ProductModel.findProductByName(name);
};

module.exports = {
  createProduct,
  findProductByName,
};
