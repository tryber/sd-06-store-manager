const { error, magicNumbers } = require('../utils/dictionary');
const { products } = require('../models');
const { validateProduct } = require('../utils/validators');

const createProduct = async (product) => {
  await validateProduct(product);
  const isNameTaken = await findByName(product.name);
  if (isNameTaken) throw new Error(error.invalidProductName);
  return products.insertProduct('products', product);
};

const findByName = async (name) => products.queryByName('products', name);

const getProducts = async (id) => {
  const productsList = await products.queryProducts('products', id);
  if (productsList.length === magicNumbers.zero) throw new Error(error.invalidId);
  return productsList;
};

const updateProduct = async (id, body) => {
  const product = await getProducts(id);
  const updatedProduct = { ...product, ...body };
  await validateProduct(updatedProduct);
  await products.updateProduct('products', id, updatedProduct);
  return updatedProduct;
};

module.exports = {
  createProduct,
  findByName,
  getProducts,
  updateProduct,
};
