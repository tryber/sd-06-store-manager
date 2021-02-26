const { error } = require('../utils/dictionary');
const { products, utils } = require('../models');
const { validateProduct } = require('../utils/validators');

const createProduct = async (product) => {
  const isNameTaken = await findByName(product.name);
  await validateProduct(product, isNameTaken);
  return utils.insertToDb('products', product);
};

const findByName = async (name) => products.queryByName('products', name);

const getProducts = async (id) => {
  const productsList = await utils.queryFromDb('products', id);
  if (!productsList) throw new Error(error.invalidId);
  return productsList;
};

const updateProduct = async (id, body) => {
  const product = await getProducts(id);
  const updatedProduct = { ...product, ...body };
  await validateProduct(updatedProduct);
  await products.updateProduct('products', id, updatedProduct);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  await getProducts(id);
  return utils.deleteFromDb('products', id);
};

module.exports = {
  createProduct,
  deleteProduct,
  findByName,
  getProducts,
  updateProduct,
};
