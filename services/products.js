const { products } = require('../models');

const findByName = async (name) => products.queryByName('products', name);

const createProduct = async (product) => products.insertProduct('products', product);

module.exports = {
  findByName,
  createProduct,
};
