const createProducts = require('./createProducts');
const validateProduct = require('./validateProduct');
const checkName = require('./checkName');
const updateProduct = require('./updateProduct');
const findProducts = require('./findProducts');
const findProduct = require('./findProduct');
const deleteProduct = require('./deleteProduct');

module.exports = {
  deleteProduct,
  findProducts,
  findProduct,
  createProducts,
  updateProduct,
  validateProduct,
  checkName,
};