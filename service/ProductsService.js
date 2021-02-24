const Products = require('../model/ProductsModel');

const getAll = async () => {
  return Products.getAll();
};

const getById = async (id) => {
  return Products.getById(id);
};

const createProduct = async (name, quantity) => {
  return Products.createProduct(name, quantity);
};

const updateProduct = async (id, name, quantity) => {
  return Products.updateProduct(id, name, quantity);
};

const deleteProduct = async (id) => {
  return Products.deleteProduct(id);
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct
};
