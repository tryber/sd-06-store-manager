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

const updateProduct = async (id, data) => {
  return Products.updateProduct(id, data);
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct
};
