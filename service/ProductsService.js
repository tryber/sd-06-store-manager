const Products = require('../model/ProductsModel');

const getAll = async () => {
  return Products.getAll();
};

const createProduct = async (name, quantity) => {
  return Products.createProduct(name, quantity);
};

module.exports = {
  createProduct,
  getAll
};
