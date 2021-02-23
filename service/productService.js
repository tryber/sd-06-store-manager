const Store = require('../models/store');

const createProduct = (product) => Store.createProduct(product);

module.exports = {
  createProduct
};
