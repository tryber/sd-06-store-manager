const Product = require('../models/Product');

function isNameValid(name) {
  //
}

async function getAll() {
  console.log('Service called');
  const products = await Product.getAll();
  return products;
}

async function create(name, quantity) {
  //
}

module.exports = {
  getAll,
  create,
};
