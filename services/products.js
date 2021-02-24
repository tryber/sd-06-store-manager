const { products } = require('../models');
const { validateProduct } = require('../utils/validators');
const { error } = require('../utils/dictionary');

const findByName = async (name) => products.queryByName('products', name);

const createProduct = async (product) => {
  await validateProduct(product);
  const isNameTaken = await findByName(product.name);
  if (isNameTaken) throw new Error(error.invalidProductName);
  return products.insertProduct('products', product);
};

module.exports = {
  findByName,
  createProduct,
};
