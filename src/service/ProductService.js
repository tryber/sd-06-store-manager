const ProductModel = require('../model/ProductModel');

const createProduct = async (product) => {
  return await ProductModel.createProduct(product);
};

const findAllProducts = async () => {
  return await ProductModel.findAllProducts();
};

const findProductByName = async (name) => {
  return await ProductModel.findProductByName(name);
};

const findProductById = async (id) => {
  return await ProductModel.findProductById(id);
};

const updateProduct = async (product) => {
  return await ProductModel.updateProduct(product);
};

const removeProduct = async (id) => {
  return await ProductModel.removeProduct(id);
};

module.exports = {
  createProduct,
  findAllProducts,
  findProductById,
  findProductByName,
  removeProduct,
  updateProduct,
};
